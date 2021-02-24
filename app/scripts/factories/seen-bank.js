/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/*
 * SaaS manager
 */

/**
 * @ngdoc Factories
 * @name BankReceipt
 * @description Receipts of the banks
 */
mblowfish.factory('BankReceipt', seen.factory({
	url: '/api/v2/bank/receipts'
}));

/**
 * @ngdoc Factories
 * @name BankBackend
 * @description Backends of the banks
 */
mblowfish.factory('BankBackend', seen.factory({
	url: '/api/v2/bank/backends',
	resources: [{
		name: 'Receipt',
		factory: 'BankReceipt',
		type: 'collection',
		url: '/receipts'
	}, {
		name: 'Meta',
		factory: 'BankMeta',
		type: 'collection',
		url: '/metas'
	}]
}));

/**
 * @ngdoc Factories
 * @name BankMeta
 * @description Metas of the banks
 */
mblowfish.factory('BankMeta', seen.factory({
	url: '/api/v2/bank/metas'
}));

/**
 * @ngdoc Factories
 * @name BankEngine
 * @description Engines of the banks
 */
mblowfish.factory('BankEngine', seen.factory({
	url: '/api/v2/bank/engines',
	resources: [{
		name: 'Backend',
		factory: 'BankBackend',
		type: 'collection',
		url: '/backends'
	}]
}));


/**
 * @ngdoc Factories
 * @name BankWallet
 * @description list of Wallets
 */
mblowfish.factory('BankWallet', seen.factory({
	url: '/api/v2/bank/wallets',
	resources: [{
		name: 'Payment',
		factory: 'BankPayment',
		type: 'collection',
		url: '/payments'
	}, {
		name: 'Transfer',
		factory: 'BankTransfer',
		type: 'collection',
		url: '/transfers'
	}]
}));

/**
 * @ngdoc Factories
 * @name BankPayment
 * @description list of payments over a wallet
 */
mblowfish.factory('BankPayment', seen.factory({
	url: '/api/v2/bank/{wallet_id}/payments'
}))

	/**
	 * @ngdoc Factories
	 * @name BankTransfer
	 * @description list of transfers over a wallet
	 */
	.factory('BankTransfer', seen.factory({
		url: '/api/v2/bank/wallets/{wallet_id}/transfers'
	}));

/**
 * @ngdoc Services
 * @name $bank
 * @description bank service
 * 
 * manages all banks.
 */
mblowfish.service('$bank', seen.service({
	resources: [{
		name: 'Receipt',
		factory: 'BankReceipt',
		type: 'collection',
		url: '/api/v2/bank/receipts'
	}, {
		name: 'Backend',
		factory: 'BankBackend',
		type: 'collection',
		url: '/api/v2/bank/backends'
	}, {
		name: 'Engine',
		factory: 'BankEngine',
		type: 'collection',
		url: '/api/v2/bank/engines'
	}, {
		name: 'Wallet',
		factory: 'BankWallet',
		type: 'collection',
		url: '/api/v2/bank/wallets'
	}]
}));
