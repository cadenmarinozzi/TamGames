import Button from 'Components/shared/Button';
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextBox from 'Components/shared/TextBox';
import { Component } from 'react';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set, update } from 'firebase/database';
import './GameRequest.scss';

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
const gameRequestsRef = ref(database, 'gameRequests');

class GameRequest extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async submitGameRequest() {
		const currentGameRequests = await get(ref(database), 'gameRequests');
		update(ref(database), {
			gameRequests: [
				...currentGameRequests.val()['gameRequests'],
				this.state.textboxValue,
			],
		});
	}

	submitAndClose() {
		this.submitGameRequest(this.state.textboxValue);
		this.props.closeGameRequest();
	}

	handleTextboxChange(event) {
		this.setState({
			textboxValue: event.target.value,
		});
	}

	render() {
		return (
			<div className='game-request-container'>
				<div className='game-request'>
					<TextBox
						onInput={this.handleTextboxChange.bind(this)}
						placeholder='Enter your game request here and a link to the game if you have one. Ex: "GetTam, https://gettamgame.com"'
					/>
					<Button
						onClick={this.submitAndClose.bind(this)}
						label='Submit'
						icon={faPaperPlane}
						cta
					/>
					<Button
						onClick={this.props.closeGameRequest}
						label='Close'
						icon={faClose}
					/>
				</div>
			</div>
		);
	}
}

export default GameRequest;
