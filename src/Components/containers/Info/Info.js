import Button from 'Components/shared/Button';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Component } from 'react';
import './Info.scss';

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
