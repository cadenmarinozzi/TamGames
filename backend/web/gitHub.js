const { default: axios } = require('axios');

async function getUserToken(code) {
	const { data } = await axios.post(
		'https://github.com/login/oauth/access_token',
		{
			client_id: process.env.GITHUB_CLIENT_ID,
			client_secret: process.env.GITHUB_CLIENT_SECRET,
			code,
		}
	);

	// Parse the response to get the access token
	const accessToken = data.split('=')[1].split('&')[0];

	return accessToken;
}

exports.getUserToken = getUserToken;
