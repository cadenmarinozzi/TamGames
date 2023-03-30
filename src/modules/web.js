import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set, update, remove } from 'firebase/database';
import { sha256 } from 'js-sha256';
import { getCookie, getCookies, setCookies } from './cookies';
import { formatFirebaseEmail } from './utils';
import axios from 'axios';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
	apiKey: 'AIzaSyAXKTx9akcSGCYOeVuCBbGH1izF4BKKYW8',
	authDomain: 'tam-games.firebaseapp.com',
	projectId: 'tam-games',
	storageBucket: 'tam-games.appspot.com',
	messagingSenderId: '1065857168807',
	appId: '1:1065857168807:web:ee338f676598b43e2d7282',
	measurementId: 'G-NLW99CXHY8',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const gamePlaysRef = ref(database, 'gamePlays');
const siteViewsRef = ref(database, 'siteViews');
const gameRequestsRef = ref(database, 'gameRequests');
const brokenGamesRef = ref(database, 'brokenGames');
const gameRatingsRef = ref(database, 'gameRatings');
const usersRef = ref(database, 'users');

const analytics = getAnalytics(app);
const perf = getPerformance(app);

async function getSiteViews() {
	const siteViews = await get(siteViewsRef);

	return siteViews.val();
}

async function deleteAccount({ email }) {
	const formattedEmail = formatFirebaseEmail(email);

	await remove(ref(database, `users/${formattedEmail}`));
}

async function setGitHubFollowing({ email }) {
	const formattedEmail = formatFirebaseEmail(email);

	const userRef = ref(database, `users/${formattedEmail}`);

	await update(userRef, {
		githubFollowing: true,
	});

	return;
}

async function getUserGitHubFollowing({ email }) {
	const formattedEmail = formatFirebaseEmail(email);

	const user = await get(ref(database, `users/${formattedEmail}`));

	if (!user.exists()) {
		return false;
	}

	const userData = user.val();

	return userData.githubFollowing;
}

async function signUp({ email, password }) {
	const hashedPassword = sha256(password);
	const formattedEmail = formatFirebaseEmail(email);

	const currentUsers = await get(usersRef);

	const user = {
		email,
		password: hashedPassword,
	};

	if (!currentUsers.exists()) {
		await set(usersRef, {
			[formattedEmail]: user,
		});

		return;
	}

	await update(usersRef, {
		[formattedEmail]: user,
	});
}

async function login({ email, password }) {
	const user = await get(
		ref(database, `users/${formatFirebaseEmail(email)}`)
	);

	if (!user.exists()) {
		return false;
	}

	const userData = user.val();

	if (userData.password === sha256(password)) {
		return true;
	}

	return false;
}

async function saveData({ email }) {
	const cookies = getCookies(); // Object containing json parsed cookies
	cookies.password = ''; // Remove password from cookies

	const cookiesJSON = JSON.stringify(cookies); // Stringified cookies
	const localStorageJSON = JSON.stringify(localStorage); // Stringified localStorage

	const userRef = ref(database, `users/${formatFirebaseEmail(email)}`);

	await update(userRef, {
		cookies: cookiesJSON,
		localStorage: localStorageJSON,
	});
}

async function addImagePrice({ email }) {
	const userRef = ref(database, `users/${formatFirebaseEmail(email)}`);

	const user = await get(userRef);

	const userData = user.val();

	if (!userData.imagePrice) {
		await update(userRef, {
			imagePrice: 0.02,
		});

		return;
	}

	await update(userRef, {
		imagePrice: userData.imagePrice + 0.02,
	});
}

async function getImagePriceUsage({ email }) {
	const userRef = ref(database, `users/${formatFirebaseEmail(email)}`);

	const user = await get(userRef);

	const userData = user.val();

	return userData.imagePrice || 0;
}

async function addChatPrice({ email, price }) {
	const userRef = ref(database, `users/${formatFirebaseEmail(email)}`);

	const user = await get(userRef);

	const userData = user.val();

	if (!userData.chatPrice) {
		await update(userRef, {
			chatPrice: price,
		});

		return;
	}

	await update(userRef, {
		chatPrice: userData.chatPrice + price,
	});
}

async function getChatPriceUsage({ email }) {
	const userRef = ref(database, `users/${formatFirebaseEmail(email)}`);

	const user = await get(userRef);

	const userData = user.val();

	return userData.chatPrice || 0;
}

async function loadData({ email }) {
	const user = await get(
		ref(database, `users/${formatFirebaseEmail(email)}`)
	);

	if (!user.exists()) {
		return false;
	}

	const userData = user.val();

	if (userData.cookies) {
		setCookies(JSON.parse(userData.cookies));
	}

	if (userData.localStorage) {
		const data = JSON.parse(userData.localStorage);

		for (const [key, value] of data) {
			localStorage.setItem(key, value);
		}
	}

	return false;
}

// This is so insecure lol
async function submitGameRequest(gameRequest) {
	const currentGameRequests = await get(gameRequestsRef);

	const gameRequests = currentGameRequests.val();

	if (!gameRequests) {
		update(ref(database), {
			gameRequests: [gameRequest],
		});

		return;
	}

	update(ref(database), {
		gameRequests: [...gameRequests, gameRequest],
	});
}

async function submitBrokenGame(brokenGame) {
	const currentBrokenGames = await get(brokenGamesRef);

	const brokenGames = currentBrokenGames.val();

	if (!brokenGames) {
		update(ref(database), {
			brokenGames: [brokenGame],
		});

		return;
	}

	update(ref(database), {
		brokenGames: [...brokenGames, brokenGame],
	});
}

async function addSiteView() {
	const date = new Date();

	const currentSiteViews = await get(siteViewsRef);

	if (!currentSiteViews.val()[date.toDateString()]) {
		update(siteViewsRef, {
			[date.toDateString()]: 1,
		});

		return;
	}

	update(siteViewsRef, {
		[date.toDateString()]: currentSiteViews.val()[date.toDateString()] + 1,
	});
}

async function addGamePlay(gameName) {
	const currentGamePlays = await get(gamePlaysRef);

	if (!currentGamePlays.val()[gameName]) {
		update(gamePlaysRef, {
			[gameName]: 1,
		});

		return;
	}

	update(gamePlaysRef, {
		[gameName]: currentGamePlays.val()[gameName] + 1,
	});
}

async function getGamePlays() {
	const currentGamePlays = await get(gamePlaysRef);

	return currentGamePlays.val();
}

async function rateGame(gameName, rating) {
	const currentGameRatings = await get(gameRatingsRef);

	if (!currentGameRatings.exists()) {
		update(gameRatingsRef, {
			[gameName]: {
				[rating]: 1,
			},
		});

		return;
	}

	if (!currentGameRatings.val()[gameName]) {
		update(gameRatingsRef, {
			[gameName]: {
				[rating]: 1,
			},
		});

		return;
	}

	if (!currentGameRatings.val()[gameName][rating]) {
		update(gameRatingsRef, {
			[gameName]: {
				...currentGameRatings.val()[gameName],
				[rating]: 1,
			},
		});

		return;
	}

	update(gameRatingsRef, {
		[gameName]: {
			...currentGameRatings.val()[gameName],
			[rating]: currentGameRatings.val()[gameName][rating] + 1,
		},
	});
}

async function getGameRatings() {
	const currentGameRatings = await get(gameRatingsRef);

	return currentGameRatings.val();
}

async function promptChatGPT(history, message) {
	try {
		const { data } = await axios.post(
			'https://us-central1-tam-games.cloudfunctions.net/app/chatgpt',
			{
				history,
				message,
			}
		);

		return data;
	} catch (e) {
		console.error(e);

		return;
	}
}

async function generateDalleImage(prompt) {
	const { data } = await axios.post(
		'https://us-central1-tam-games.cloudfunctions.net/app/dalle',
		{
			prompt,
		}
	);

	return data;
}

function gitHubOAuthURL() {
	return 'https://github.com/login/oauth/authorize?client_id=5fdc3b30e49bb004ffc9&scope=read:user';
}

async function getGithubAccessToken(code) {
	const { data } = await axios.post(
		'https://us-central1-tam-games.cloudfunctions.net/app/githubAuth',
		{
			code,
		}
	);

	return data;
}

async function getGitHubFollowing() {
	try {
		const { data } = await axios.get(
			'https://api.github.com/user/following/github',
			{
				headers: {
					Authorization: `token ${getCookie('githubAccessToken')}`,
					Accept: 'application/vnd.github.v3+json',
				},
			}
		);

		return true;
	} catch (e) {
		return;
	}
}

export {
	submitGameRequest,
	addSiteView,
	addGamePlay,
	getGamePlays,
	rateGame,
	getGameRatings,
	setGitHubFollowing,
	getSiteViews,
	submitBrokenGame,
	signUp,
	getGithubAccessToken,
	login,
	getUserGitHubFollowing,
	saveData,
	addImagePrice,
	getImagePriceUsage,
	loadData,
	deleteAccount,
	promptChatGPT,
	generateDalleImage,
	addChatPrice,
	getChatPriceUsage,
	gitHubOAuthURL,
	getGitHubFollowing,
};
