const functions = require('firebase-functions');
const { promptChatGPT } = require('./web/chatGPT');
const { generateDalleImage } = require('./web/dalle');
const { getFollowers, getUserToken } = require('./web/gitHub');
const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.post('/chatgpt', async (req, res) => {
	const { history, message } = req.body;
	if (!history || !message) {
		res.status(400).send('Missing history or message');
		return;
	}
	const { completion, history: newHistory } = await promptChatGPT(
		history,
		message
	);
	res.send({ completion, history: newHistory });
});

app.get('/followers', async (req, res) => {
	const followers = await getFollowers();

	res.send(followers);
});

app.post('/githubAuth', async (req, res) => {
	const { code } = req.body;

	if (!code) {
		res.status(400).send('Missing code');

		return;
	}

	const token = await getUserToken(code);

	res.send(token);
});

app.post('/dalle', async (req, res) => {
	const { prompt } = req.body;
	if (!prompt) {
		res.status(400).send('Missing prompt');

		return;
	}
	const url = await generateDalleImage(prompt);
	const imageBuffer = await axios.get(url, { responseType: 'arraybuffer' });
	// Convert the image buffer to a base64 string
	let image = Buffer.from(imageBuffer.data, 'binary').toString('base64');
	// Prepend the image with the data type
	image = `data:image/jpeg;base64,${image}`;
	res.send(image);
});

exports.app = functions.https.onRequest(app);
