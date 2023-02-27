import { lerpColor } from 'modules/utils';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

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
		return (
			<div className='footer'>
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
					@2023 Caden Marinozzi, TamGames
				</span>
			</div>
		);
	}
}

export default Footer;
