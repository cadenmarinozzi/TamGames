import Button from 'Components/shared/Button';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Component } from 'react';
import './Info.scss';
import { Link } from 'react-router-dom';

class Info extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className='info-container'>
				<div className='info'>
					<span>
						TamGames is supposed to be the one-stop website for
						mobile games and desktop games, ported over to web.
					</span>
					<span>
						None of the games on this website are made by me, and I
						do not take credit for any of them.
					</span>
					<h3 className='section-title'>Contacts</h3>
					<span>
						Want credit for a game? Want to talk to me about the
						site? You can contact me at the following locations:
					</span>
					<ul className='list'>
						<li>
							<span
								onClick={() => {
									window.location.replace(
										'https://github.com/cadenmarinozzi'
									);
								}}>
								{' '}
								GitHub
							</span>
						</li>
						<li>
							<span
								onClick={() => {
									window.location.replace(
										'https://linkedin.com/in/caden-m'
									);
								}}>
								LinkedIn
							</span>
						</li>
						<li>
							<a href='mailto:cadenmarinozzi@gmail.com'>
								Email (cadenmarinozzi@gmail.com)
							</a>
						</li>
					</ul>
					<h3 className='section-title'>Analytics</h3>
					<Link
						to='/analytics'
						onClick={this.props.closeInfo}
						className='analytics-button'>
						View Analytics
					</Link>
					<h3 className='section-title'>Links</h3>
					<span>
						TamGames can be accessed at the following locations:
					</span>
					<ul className='list'>
						<li>
							<span
								onClick={() => {
									window.location.replace(
										'https://tamgames.net'
									);
								}}>
								{' '}
								tamgames.net
							</span>
						</li>
						<li>
							<span
								onClick={() => {
									window.location.replace(
										'https://tam-games.firebaseapp.com'
									);
								}}>
								tamgames.firebaseapp.com
							</span>
						</li>
						<li>
							<span
								onClick={() => {
									window.location.replace(
										'https://tam-games.web.app'
									);
								}}>
								tam-games.web.app
							</span>
						</li>
					</ul>
					<Button
						onClick={this.props.closeInfo}
						label='Close'
						icon={faClose}
					/>
				</div>
			</div>
		);
	}
}

export default Info;
