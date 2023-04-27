import {
	faCheckCircle,
	faCircleXmark,
	faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import { getCookie } from 'modules/cookies';
import {
	requestChatGPTPaymentResponse,
	setUserUnlimitedChatGPTAccess,
} from 'modules/web';
import { Component } from 'react';
import {
	ApplePay,
	CreditCard,
	PaymentForm,
	GooglePay,
} from 'react-square-web-payments-sdk';
import './PaymentRequest.scss';

class PaymentRequest extends Component {
	constructor() {
		super();

		this.state = {
			paymentSuccess: null,
		};
	}

	render() {
		const { paymentSuccess, payment } = this.state;

		return paymentSuccess ? (
			<div className='payment-status'>
				<FontAwesomeIcon
					className='success-status-icon'
					icon={faCheckCircle}
					size='2xl'
				/>
				<span>
					Your payment was <b>successful</b>!
				</span>
				<span>You may now continue to unlimited ChatGPT access.</span>
			</div>
		) : paymentSuccess === false ? (
			<div className='payment-status'>
				<FontAwesomeIcon
					className='fail-status-icon'
					icon={faCircleXmark}
					size='2xl'
				/>
				<span>
					Your payment <b>failed</b>!
				</span>
				<span>Please try again to gain unlimited ChatGPT access.</span>
				<Button
					icon={faRepeat}
					cta
					onClick={() => this.setState({ paymentSuccess: null })}
					label='Try Again'
				/>
			</div>
		) : (
			<div className='payment-request'>
				<div className='payment-container'>
					<h3>
						<i className='fa-solid fa-cart-shopping' /> Buy
						Unlimited Access to ChatGPT
					</h3>
					<span>Benefits:</span>
					<ul>
						<li>Unlimited tokens</li>
						<li>Unlimited image generations</li>
						<li>Unlimited conversations</li>
						<li>Access to ChatGPT 4.0</li>
						<li>Access to unblocked mode</li>
						<li>Cloud conversation saving</li>
					</ul>
					<span className='payment-total'>Total: $5.00</span>
					<PaymentForm
						createPaymentRequest={() => ({
							countryCode: 'US',
							currencyCode: 'USD',
							total: {
								amount: '5.00',
								id: 'unlimited-access',
								label: 'Unlimited Access',
							},
						})}
						applicationId='sandbox-sq0idb-6THQ_4DrHhW9WbfiMbsF_w'
						cardTokenizeResponseReceived={async (
							token,
							verifiedBuyer
						) => {
							const { payment } =
								await requestChatGPTPaymentResponse({
									sourceId: token.token,
								});

							this.setState({
								paymentSuccess: payment.status === 'COMPLETED',
								payment,
							});

							await setUserUnlimitedChatGPTAccess({
								email: getCookie('email'),
							});
						}}
						locationId='LDEWY9BPRNSB4'>
						<div className='digital-payments-container'>
							<ApplePay />
							<GooglePay />
						</div>
						<br />
						<CreditCard
							style={{
								'.message-text': {
									color: '#a0a0a0',
								},
								'.message-icon': {
									color: '#a0a0a0',
								},
							}}
						/>
					</PaymentForm>
				</div>
			</div>
		);
	}
}

export default PaymentRequest;
