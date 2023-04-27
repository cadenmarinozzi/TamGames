import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Toggle.scss';

class Toggle extends Component {
	constructor({ enabled }) {
		super();

		this.state = {
			enabled,
		};
	}

	toggle() {
		if (this.props.onChange) this.props.onChange(!this.state.enabled);

		this.setState({
			enabled: !this.state.enabled,
		});
	}

	render() {
		return (
			<div className='toggle' onClick={this.toggle.bind(this)}>
				<div className='toggle-track'>
					<FontAwesomeIcon
						className={`toggle-icon ${
							this.state.enabled && 'toggle-icon-enabled'
						}`}
						size='sm'
						icon={
							this.state.enabled
								? this.props.enabledIcon
								: this.props.disabledIcon
						}
					/>
					<div
						className={`toggle-thumb ${
							this.state.enabled && 'toggle-thumb-enabled'
						}`}
					/>
				</div>
				<span
					className={`toggle-label ${
						this.state.enabled && 'toggle-label-enabled'
					}`}>
					{this.props.label}
				</span>
			</div>
		);
	}
}

export default Toggle;
