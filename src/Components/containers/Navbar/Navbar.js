import TamLogo from 'assets/images/logoSmall.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faGamepad } from '@fortawesome/free-solid-svg-icons';
import Settings from '../Settings';
import { Component } from 'react';
import Button from 'Components/shared/Button';
import './Navbar.scss';
import GameRequest from '../GameRequest';

class Navbar extends Component {
	constructor() {
		super();

		this.state = {};
	}

	closeSettings() {
		this.setState({
			settingsOpen: false,
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

	openGameRequest() {
		this.setState({
			gameRequestOpen: true,
		});
	}

	render() {
		return (
			<>
				<div className='navbar'>
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
			</>
		);
	}
}

export default Navbar;
