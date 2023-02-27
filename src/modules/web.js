import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set, update } from 'firebase/database';

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
const gameRatingsRef = ref(database, 'gameRatings');

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

export {
	submitGameRequest,
	addSiteView,
	addGamePlay,
	getGamePlays,
	rateGame,
	getGameRatings,
};
