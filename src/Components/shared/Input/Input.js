import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { calculatePasswordStrength } from 'modules/utils';
import './Input.scss';

class Input extends Component {
	constructor({ error }) {
		super();

		this.state = {
			error,
		};
	}

	render() {
		return (
			<>
				<div
					className={`input-container ${
						this.props.half && 'input-half'
					} skeuomorphic-small ${this.state.error && 'input-error'} ${
						this.props.className
					}`}>
					<label className='input-label'>
						{this.props.label}
						{this.props.required && (
							<span className='input-required'> *</span>
						)}
						{this.props.label && (
							<div className='input-label-line-container'>
								<div className='input-label-line'></div>
							</div>
						)}
					</label>
					<input
						className='input'
						id={this.id}
						type={this.props.type}
						placeholder={this.props.placeholder}
						onChange={(e) => {
							let value = e.target.value;

							if (value === '') {
								value = null;

								if (this.props.required) {
									this.setState({
										error: true,
									});
								}
							} else {
								this.setState({
									error: false,
								});
							}

							if (this.props.onChange) {
								this.props.onChange(value);
							}

							this.setState({
								passwordStrength: calculatePasswordStrength(
									e.target.value
								),
								value: e.target.value,
							});
						}}
					/>
					{this.props.type === 'password' &&
						this.props.hideStrength &&
						!this.state.value && (
							<div
								className={`password-meter meter-${this.state.passwordStrength}`}>
								{this.state.passwordStrength}
							</div>
						)}
				</div>
				{this.props.type === 'password' &&
					!this.props.hideStrength &&
					this.state.value && (
						<div className='password-strength'>
							<div
								className={`password-strength-bar password-${this.state.passwordStrength}`}
							/>
						</div>
					)}
			</>
		);
	}
}

export default Input;
