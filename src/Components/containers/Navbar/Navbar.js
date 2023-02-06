import TamLogo from 'assets/images/logoSmall.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCog,
	faGamepad,
	faInfo,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Settings from '../Settings';
import { Component, createRef } from 'react';
import Button from 'Components/shared/Button';
import GameRequest from '../GameRequest';
import Info from '../Info';
import './Navbar.scss';

class Navbar extends Component {
	constructor() {
		super();

		this.state = {};
		this.navbarRef = createRef();
	}

	closeSettings() {
		this.setState({
			settingsOpen: false,
		});
	}

	closeInfo() {
		this.setState({
			infoOpen: false,
		});
	}

	closeGameRequest() {
		this.setState({
			gameRequestOpen: false,
		});
	}

	openSettings() {
		this.setState({
			settingsOpen: true,
		});
	}

	openInfo() {
		this.setState({
			infoOpen: true,
		});
	}

	openGameRequest() {
		this.setState({
			gameRequestOpen: true,
		});
	}

	componentDidMount() {
		document.addEventListener('scroll', (event) => {
			const scroll = window.scrollY;

			if (!this.navbarRef.current) return;

			this.navbarRef.current.style.borderBottom = `1px solid rgba(63, 63, 78, ${
				scroll / 100
			})`;
		});
	}

	render() {
		return (
			<>
				<div className='navbar' ref={this.navbarRef}>
					<div className='navbar-section'>
						<Link to='/'>
							<div className='navbar-title'>
								<img
									src={TamLogo}
									alt='Tam Logo'
									className='logo'
								/>
								<div>
									<span>Tam</span>
									<span className='title-primary'>Games</span>
								</div>
							</div>
						</Link>
						<Button
							icon={faGamepad}
							label='Request Game'
							transparent
							onClick={this.openGameRequest.bind(this)}
						/>
					</div>
					<div className='navbar-section'>
						<FontAwesomeIcon
							icon={faCog}
							onClick={this.openSettings.bind(this)}
							className='navbar-button'
						/>
						<FontAwesomeIcon
							icon={faInfoCircle}
							onClick={this.openInfo.bind(this)}
							className='navbar-button'
						/>
					</div>
				</div>
				{this.state.settingsOpen && (
					<Settings closeSettings={this.closeSettings.bind(this)} />
				)}
				{this.state.gameRequestOpen && (
					<GameRequest
						closeGameRequest={this.closeGameRequest.bind(this)}
					/>
				)}
				{this.state.infoOpen && (
					<Info closeInfo={this.closeInfo.bind(this)} />
				)}
			</>
		);
	}
}

export default Navbar;
