const { openai } = require('./openAI.js');

async function generateDalleImage(prompt) {
	const response = await openai.createImage({
		prompt,
		n: 1,
		size: '1024x1024',
	});

	return response.data.data[0].url;
}

exports.generateDalleImage = generateDalleImage;
