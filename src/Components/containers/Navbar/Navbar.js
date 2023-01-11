import TamLogo from 'assets/images/logoSmall.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Settings from '../Settings';
import { Component } from 'react';
import './Navbar.scss';

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

	openSettings() {
		this.setState({
			settingsOpen: true,
		});
	}

	render() {
		return (
			<>
				<div className='navbar'>
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
					<div>
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
			</>
		);
	}
}

export default Navbar;
