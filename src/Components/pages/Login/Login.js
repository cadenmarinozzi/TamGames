import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import { login } from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { setCookie } from 'modules/cookies';
import './Login.scss';

class Login extends Component {
	constructor() {
		super();

		this.state = {};
	}

	handleEmailChange(email) {
		this.setState({
			email,
		});
	}

	handlePasswordChange(password) {
		this.setState({
			password,
		});
	}

	async login() {
		const { email, password } = this.state;

		if (!email || !password) {
			return;
		}

		const loggedIn = await login({
			email,
			password,
		});

		if (!loggedIn) {
			return;
		}

		setCookie('email', email);
		setCookie('password', password);

		window.location = '/';
	}

	render() {
		return (
			<div className='login'>
				<h3>Login</h3>
				<div className='buttons'>
					<Input
						label='Email'
						placeholder='dave.adams@gmail.com'
						required
						onChange={this.handleEmailChange.bind(this)}
					/>
				</div>
				<Input
					label='Password'
					placeholder='password123'
					type='password'
					required
					hideStrength
					onChange={this.handlePasswordChange.bind(this)}
				/>
				<div className='buttons'>
					<Button
						label='Login'
						icon={faSignInAlt}
						cta
						onClick={this.login.bind(this)}
					/>
					<Link to='/signUp'>
						<Button label='Sign Up' icon={faUserPlus} />
					</Link>
				</div>
			</div>
		);
	}
}

export default Login;
