import TamLogo from 'assets/images/logoSmall.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCog,
	faGamepad,
	faInfo,
	faInfoCircle,
	faList,
	faListCheck,
	faSignInAlt,
	faUser,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Settings from '../Settings';
import { Component, createRef } from 'react';
import Button from 'Components/shared/Button';
import GameRequest from '../GameRequest';
import Info from '../Info';
import './Navbar.scss';
import SubmitBrokenGame from '../SubmitBrokenGame';
import { deleteCookie } from 'modules/cookies';

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

	closeSubmitBrokenGame() {
		this.setState({
			submitBrokenGameOpen: false,
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

	openSubmitBrokenGame() {
		this.setState({
			submitBrokenGameOpen: true,
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

	logout() {
		deleteCookie('email');
		deleteCookie('password');
		window.location = '/';
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
						{this.props.loaded &&
							(this.props.loggedIn ? (
								<Button
									icon={faSignInAlt}
									label='Logout'
									transparent
									onClick={this.logout.bind(this)}
								/>
							) : (
								<Link to='/signUp'>
									<Button
										icon={faUserPlus}
										label='Sign Up'
										transparent
									/>
								</Link>
							))}
					</div>
					<div className='navbar-section'>
						<span
							className='broken-game-button'
							onClick={this.openSubmitBrokenGame.bind(this)}>
							Report Broken Game
						</span>
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
						{this.props.loggedIn && (
							<Link to='/account'>
								<FontAwesomeIcon
									icon={faUser}
									className='navbar-button'
								/>
							</Link>
						)}
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
				{this.state.submitBrokenGameOpen && (
					<SubmitBrokenGame
						closeSubmitBrokenGame={this.closeSubmitBrokenGame.bind(
							this
						)}
					/>
				)}
			</>
		);
	}
}

export default Navbar;
