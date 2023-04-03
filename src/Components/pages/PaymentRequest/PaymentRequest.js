import { Component } from 'react';
import {
	ApplePay,
	CreditCard,
	PaymentForm,
	GooglePay,
} from 'react-square-web-payments-sdk';
import './PaymentRequest.scss';

function buildPaymentRequest(payments) {
	return payments.paymentRequest({
		countryCode: 'US',
		currencyCode: 'USD',
		total: {
			amount: '1.00',
			label: 'Total',
		},
	});
}

async function initializeApplePay(payments) {
	const paymentRequest = buildPaymentRequest(payments);
	const applePay = await payments.applePay(paymentRequest);
	// Note: You do not need to `attach` applePay.
	return applePay;
}

class PaymentRequest extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			// <div className='payment-request'>
			// 	<form id='payment-form'>
			// 		<div id='apple-pay-button'></div>
			// 		<div id='card-container'></div>
			// 		<button id='card-button' type='button'>
			// 			Pay $1.00
			// 		</button>
			// 	</form>
			// 	<div id='payment-status-container'></div>
			// </div>
			<>
				<PaymentForm
					createPaymentRequest={() => ({
						countryCode: 'US',
						currencyCode: 'USD',
						total: {
							amount: '1.00',
							label: 'Total',
						},
					})}
					applicationId='sandbox-sq0idb-6THQ_4DrHhW9WbfiMbsF_w'
					cardTokenizeResponseReceived={(token, verifiedBuyer) => {
						console.log('token:', token);
						console.log('verifiedBuyer:', verifiedBuyer);
					}}
					locationId='LDEWY9BPRNSB4'>
					{' '}
					<ApplePay />
					<GooglePay />
					<CreditCard />
				</PaymentForm>
			</>
		);
	}
}

export default PaymentRequest;
