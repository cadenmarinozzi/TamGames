const { v4: uuid } = require('uuid');
const { Client } = require('square');

BigInt.prototype.toJSON = function () {
	return this.toString();
};

const { paymentsApi } = new Client({
	accessToken: process.env.SQUARE_ACCESS_TOKEN,
	environment: 'sandbox',
});

async function paymentRequestHandler(sourceId) {
	const { result } = await paymentsApi.createPayment({
		idempotencyKey: uuid(),
		sourceId,
		amountMoney: {
			currency: 'USD',
			amount: 500, // $5.00
		},
	});

	console.log(result);

	if (result.errors) {
	}

	return result;
}

exports.paymentRequestHandler = paymentRequestHandler;
