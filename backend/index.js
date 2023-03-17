const functions = require('firebase-functions');
const { promptChatGPT } = require('./web/chatGPT');
const { generateDalleImage } = require('./web/dalle');
const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

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
