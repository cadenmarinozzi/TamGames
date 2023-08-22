import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { lerpColor } from 'modules/utils';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { getCookie } from 'modules/cookies';

class Footer extends Component {
	componentDidMount() {
		window.addEventListener('scroll', () => {
			const body = document.body,
				html = document.documentElement;

			const height = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight,
				html.scrollHeight,
				html.offsetHeight
			);
			document.querySelectorAll('.footer-text').forEach((element) => {
				element.style.color = lerpColor(
					'rgb(63, 63, 78)',
					'rgb(255, 255, 255)',
					window.scrollY / height
				);
			});
		});
	}

	render() {
		const email = getCookie('email');

		return (
			<div className='footer'>
				{this.props.loggedIn && (
					<span className='footer-text'>Logged in as {email}</span>
				)}
				<span className='footer-text'>
					Brought to you by Caden Marinozzi
				</span>
				<Link to='termsOfService' className='footer-text footer-button'>
					Terms of Service
				</Link>
				<Link to='privacyPolicy' className='footer-text footer-button'>
					Privacy Policy
				</Link>
				<span className='footer-text'>
					©TamGames 2023, Caden Marinozzi
				</span>
				<div className='footer-links'>
					<FontAwesomeIcon
						className='footer-button'
						icon={faGithub}
						onClick={() => {
							window.location.replace(
								'https://github.com/nekumelon/TamGames'
							);
						}}
					/>
				</div>
			</div>
		);
	}
}

export default Footer;
