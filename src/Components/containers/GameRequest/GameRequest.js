import Button from 'Components/shared/Button';
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextBox from 'Components/shared/TextBox';
import { Component } from 'react';
import { submitGameRequest } from 'modules/web';
import './GameRequest.scss';

const todo = [
	{
		title: 'Shell Shockers',
		status: 'TODO',
	},
	{
		title: 'Cookie Clicker',
		status: 'TODO',
	},
	{
		title: 'Chess.com',
		status: 'TODO',
	},
	{
		title: 'Roblox',
		status: 'TODO',
	},
	{
		title: 'Geometry Dash',
		status: 'In progress',
	},
	{
		title: 'Funny Shooter',
		status: 'In progress',
	},
	{
		title: 'Time Shooter',
		status: 'In progress',
	},
	{
		title: 'Temple Run 2',
		status: 'In progress',
	},
	{
		title: 'Cut the Rope',
		status: 'In progress',
	},
	{
		title: 'Drift Boss',
		status: 'Finished',
	},
];

class GameRequest extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async submitAndClose() {
		if (!this.state.textboxValue) {
			return;
		}

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
				<div className='game-request-content'>
					<div className='game-request'>
						<TextBox
							onInput={this.handleTextboxChange.bind(this)}
							placeholder='Enter your game request here and a link to the game if you have one. Ex: "GetTam, https://gettamgame.com"'
						/>
						<div className='game-request-buttons'>
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
					<div className='games-todo'>
						<h3>TODO</h3>
						<ul className='games-todo-list'>
							{todo.map((game, index) => {
								return (
									<li key={index}>
										<span className='game-title'>
											{game.title}
										</span>
										:{' '}
										<span
											className={`game-status ${
												game.status === 'TODO'
													? 'game-status-todo'
													: game.status ===
													  'In progress'
													? 'game-status-in-progress'
													: 'game-status-finished'
											}`}>
											{game.status}
										</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default GameRequest;
