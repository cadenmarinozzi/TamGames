import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import { addGamePlay } from 'modules/web';
import { Component } from 'react';
import './Game.scss';

class Game extends Component {
	constructor(props) {
		super();

		this.state = {};
		addGamePlay(props.title);
	}

	enableFullscreen() {
		this.setState({
			fullscreen: true,
		});

		document.addEventListener('fullscreenchange', () => {
			if (!document.fullscreenElement) {
				this.setState({
					fullscreen: false,
				});
			}
		});

		document.querySelector('.game-frame').requestFullscreen();
	}

	render() {
		return (
			<div className='game-container'>
				<iframe
					src={this.props.url}
					className={`game-frame ${
						this.state.fullscreen && 'game-frame-fullscreen'
					}`}
					title={this.props.title}
				/>
				<FontAwesomeIcon
					className='fullscreen-icon'
					icon={faUpRightAndDownLeftFromCenter}
					onClick={this.enableFullscreen.bind(this)}
				/>
			</div>
		);
	}
}

export default Game;
