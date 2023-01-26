import Button from 'Components/shared/Button';
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextBox from 'Components/shared/TextBox';
import { Component } from 'react';
import { submitGameRequest } from 'modules/web';
import './GameRequest.scss';

class GameRequest extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async submitAndClose() {
		await submitGameRequest(this.state.textboxValue);
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
