import Button from 'Components/shared/Button';
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextBox from 'Components/shared/TextBox';
import { Component } from 'react';
import { submitBrokenGame } from 'modules/web';
import './SubmitBrokenGame.scss';

class SubmitBrokenGame extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async submitAndClose() {
		if (!this.state.textboxValue) {
			return;
		}

		await submitBrokenGame(this.state.textboxValue);
		this.props.closeSubmitBrokenGame();
	}

	handleTextboxChange(event) {
		this.setState({
			textboxValue: event.target.value,
		});
	}

	render() {
		return (
			<div className='submit-broken-game-container'>
				<div className='submit-broken-game-content'>
					<div className='submit-broken-game'>
						<TextBox
							onInput={this.handleTextboxChange.bind(this)}
							placeholder='Enter the name of the broken game, and when the game broke. Ex: "Happy Wheels. It broke after the first level was completed."'
						/>
						<div className='submit-broken-game-buttons'>
							<Button
								onClick={this.submitAndClose.bind(this)}
								label='Submit'
								icon={faPaperPlane}
								cta
							/>
							<Button
								onClick={this.props.closeSubmitBrokenGame}
								label='Close'
								icon={faClose}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SubmitBrokenGame;
