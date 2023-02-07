import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import { addGamePlay } from 'modules/web';
import { Component, createRef } from 'react';
import './Game.scss';

class Game extends Component {
	constructor(props) {
		super();

		this.state = {};

		this.loaderRef = createRef();
		this.loaderLabelRef = createRef();

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

	loaderLoaded() {
		this.loaderRef.current.style.display = 'none';

		setTimeout(() => {
			for (let i = 0; i < 1; i += 0.001) {
				setTimeout(() => {
					this.loaderLabelRef.current.style.opacity = 1 - i;
				}, 50);
			}
		}, 2000);
	}

	render() {
		return (
			<>
				<div className='game-container'>
					<div className='loader' ref={this.loaderRef} />
					<div className='loader-label' ref={this.loaderLabelRef}>
						Games may take a while to load. Please be patient.
					</div>
					<iframe
						src={this.props.url}
						className={`game-frame ${
							this.state.fullscreen && 'game-frame-fullscreen'
						}`}
						title={this.props.title}
						onLoad={this.loaderLoaded.bind(this)}></iframe>
					<FontAwesomeIcon
						className='fullscreen-icon'
						icon={faUpRightAndDownLeftFromCenter}
						onClick={this.enableFullscreen.bind(this)}
					/>
				</div>
			</>
		);
	}
}

export default Game;
