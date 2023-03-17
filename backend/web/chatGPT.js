const { openai } = require('./openAI.js');

async function promptChatGPT(history, message) {
	const messages = [];

	for (const [prompt, completion] of history) {
		messages.push({ role: 'user', content: prompt });
		messages.push({ role: 'assistant', content: completion });
	}

	messages.push({ role: 'user', content: message });

	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages,
	});

	const completionText = completion.data.choices[0].message.content;

	return {
		completion: completionText,
		history: [...history, [message, completionText]],
	};
}

exports.promptChatGPT = promptChatGPT;
