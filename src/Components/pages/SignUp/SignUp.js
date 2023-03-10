import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import { signUp } from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { setCookie } from 'modules/cookies';
import './SignUp.scss';

class SignUp extends Component {
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

	async signUp() {
		const { email, password } = this.state;

		if (!email || !password) {
			return;
		}

		setCookie('email', email);
		setCookie('password', password);

		await signUp({
			email,
			password,
		});

		window.location = '/';
	}

	render() {
		return (
			<div className='sign-up'>
				<h3>Sign Up</h3>
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
					onChange={this.handlePasswordChange.bind(this)}
				/>
				<div className='buttons'>
					<Button
						label='Sign Up'
						icon={faUserPlus}
						cta
						onClick={this.signUp.bind(this)}
					/>
					<Link to='/login'>
						<Button label='Login' icon={faSignInAlt} />
					</Link>
				</div>
			</div>
		);
	}
}

export default SignUp;
