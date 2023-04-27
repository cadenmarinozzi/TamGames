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
			this.loaderLabelRef.current.style.opacity = 0;
			this.loaderLabelRef.current.style.display = 'none';
		}, 2000);
	}

	render() {
		return (
			<>
				<div className='ad-spot ad-spot-left game-ad-spot'>
					{/* <span className='ad-spot-label'>
						Click to put your ad Here!
					</span> */}
					<script
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2775045064169395'
						crossorigin='anonymous'></script>
					<ins
						className='adsbygoogle'
						style={{
							display: 'inline-block',
							width: '200px',
							height: '500px',
						}}
						data-ad-client='ca-pub-2775045064169395'
						data-ad-slot='9871010146'></ins>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({});
					</script>
				</div>
				<div className='ad-spot ad-spot-right'>
					{/* <span className='ad-spot-label'>
						Click to put your ad Here!
					</span> */}
					<script
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2775045064169395'
						crossOrigin='anonymous'></script>
					<ins
						className='adsbygoogle'
						style={{ display: 'block' }}
						data-ad-client='ca-pub-2775045064169395'
						data-ad-slot='2198735383'
						data-ad-format='auto'
						data-full-width-responsive='true'></ins>
					<script>
						(adsbygoogle = window.adsbygoogle || []).push({});
					</script>
				</div>
				<div className='game-container'>
					<div className='loader' ref={this.loaderRef} />
					<div className='loader-label' ref={this.loaderLabelRef}>
						Games may take a while to load. Please be patient.
					</div>
					{this.props.credit && (
						<div className='credit-label'>{this.props.credit}</div>
					)}
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
