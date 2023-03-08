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
const siteViewsRef = ref(database, 'siteViews');

async function getSiteViews() {
	const siteViews = await get(siteViewsRef);

	return siteViews.val();
}

export { getSiteViews };
