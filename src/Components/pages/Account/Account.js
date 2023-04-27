import {
	faDownload,
	faEye,
	faMultiply,
	faSave,
	faUpload,
	faUserEdit,
	faUserSlash,
	faUserXmark,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import { deleteCookie, getCookie, setCookie } from 'modules/cookies';
import { saveData, loadData, deleteAccount } from 'modules/web';
import { Component } from 'react';
import './Account.scss';

class Account extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async deleteAccount() {
		const email = getCookie('email');

		deleteCookie('email');
		deleteCookie('password');

		await deleteAccount({ email });

		window.location = '/';
	}

	render() {
		const email = getCookie('email');

		return (
			<div className='account-container'>
				<div className='account'>
					<span>Account</span>
					<span className='account-email'>{email}</span>
					<span>Data</span>
					<Button
						label='Save Data To Cloud'
						onClick={() => saveData({ email })}
						icon={faDownload}
					/>
					<Button
						label='Load Data From Cloud'
						icon={faUpload}
						onClick={() => loadData({ email })}
					/>
					{/* <Button
						label='Export Data'
						icon={faSave}
						onClick={() => {
							const cookies = document.cookie;

							const element = document.createElement('a');
							element.setAttribute(
								'href',
								'data:text/plain;charset=utf-8,' +
									encodeURIComponent(cookies)
							);
							element.setAttribute('download', 'cookies.txt');

							element.style.display = 'none';
							document.body.appendChild(element);

							element.click();
						}}
					/> */}
					<span>Account Actions</span>
					<Button label='Edit Login Info' icon={faUserEdit} cta />
					<Button
						label='Delete Account'
						icon={faUserSlash}
						danger
						onClick={this.deleteAccount.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

export default Account;
