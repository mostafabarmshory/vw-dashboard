/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
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

mblowfish.addConstants({
	//------------------------------------------------------------
	// Resources Types
	//------------------------------------------------------------
//	AMD_CMS_CONTENT_RT: '/cms/contents',
//	AMD_CMS_METADATA_RT: '/cms/metadata',
//	AMD_CMS_TERMTAXONOMIES_RT: '/cms/term-taxonomies',


	//------------------------------------------------------------
	// Stoer Paths
	//------------------------------------------------------------
//	AMD_CMS_CONTENT_SP: '/cms/contents',
//	AMD_CMS_METADATA_SP: '/cms/metadata',
//	AMD_CMS_TERMTAXONOMIES_SP: '/cms/term-taxonomies',
//	AMD_CMS_TERMS_SP: '/cms/terms',
	AMD_BANK_GATE_SP: '/bank/backends',


	//------------------------------------------------------------
	// Views
	//------------------------------------------------------------
//	AMD_CMS_VIEW_CONTENT_NEW_PATH: '/cms/contents-new',
//	AMD_CMS_VIEW_CONTENTS_PATH: '/cms/contents',
//	AMD_CMS_VIEW_TERMS_PATH: '/cms/terms',
//	AMD_CMS_VIEW_TERM_TAXONOMIES_PATH: '/cms/term-taxonomies',


	//------------------------------------------------------------
	// ACTIONS
	//------------------------------------------------------------
	AMD_BANK_GATES_DELETE_ACTION: 'amd.bank.gate.delete',
	AMD_BANK_GATES_EDIT_ACTION: 'amd.bank.gate.edit',
	AMD_BANK_GATES_CREATE_ACTION: 'amd.bank.gate.create',
});




mblowfish.config(function($mbViewProvider, $mbEditorProvider) {

	$mbViewProvider //
		.addView('/wallets', {
			title: 'Wallets',
			icon: 'account_balance_wallet',
			controller: 'AmdBankWalletsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-bank-wallets.html',
			groups: ['Finance'],
		})
		.addView('/wallets-new', {
			title: 'New wallet',
			icon: 'add',
			controller: 'AmdBankWalletNewCtrl',
			templateUrl: 'views/amd-bank-wallet-new.html',
			controllerAs: 'ctrl',
			groups: ['Finance'],
		})
		.addView('/my-wallets', {
			title: 'My wallets',
			icon: 'account_balance_wallet',
			controller: 'AmdBankWalletsCtrl',
			templateUrl: 'views/amd-bank-my-wallets.html',
			controllerAs: 'ctrl',
			groups: ['Finance'],
		})
		.addView('/wallet-to-wallet', {
			title: 'Wallet to wallet',
			icon: 'swap_horiz',
			templateUrl: 'views/amd-bank-wallet-to-wallet.html',
			controller: 'AmdBankWalletToWalletCtrl',
			controllerAs: 'ctrl',
			groups: ['Finance'],
		})
		.addView('/wallets-charge', {
			title: 'Charge wallet',
			icon: 'battery_charging_80',
			templateUrl: 'views/amd-bank-wallet-charge.html',
			controller: 'AmdBankWalletChargeCtrl',
			controllerAs: 'ctrl',
			groups: ['Finance'],
		})
		.addView('/bank/banks', {
			title: 'Bank engines',
			icon: 'attach_money',
			controller: 'AmdBanksCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-bank-banks.html',
			groups: ['Finance'],
		})
		.addView('/bank/receipts', {
			title: 'Recipts',
			icon: 'receipt',
			controller: 'AmdBankReceiptsCtrl',
			templateUrl: 'views/amd-bank-receipts.html',
			groups: ['Finance'],
		})
		.addView('/discounts', {
			title: 'Discounts',
			icon: 'money_off',
			controller: 'AmdDiscountsCtrl',
			templateUrl: 'views/amd-discount-discounts.html',
			groups: ['Finance'],
		})
		.addView('/discounts-new', {
			title: 'New Discount',
			icon: 'card_giftcard',
			controller: 'AmdDiscountNewCtrl',
			templateUrl: 'views/amd-discount-new.html',
			groups: ['Finance'],
		});


	$mbEditorProvider
		.addEditor('/wallets/:walletId/payments/:paymentId', {
			templateUrl: 'views/amd-bank-wallet-payment.html',
			controller: 'AmdBankWalletPaymentCtrl',
			controllerAs: 'ctrl',
		})//
		.addEditor('/wallets/:walletId', {
			templateUrl: 'views/amd-bank-wallet.html',
			controller: 'AmdBankWalletCtrl',
			controllerAs: 'ctrl',
		})
		.addEditor('/bank/gates/:gateId', {
			controller: 'AmdBankGateCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-bank-gate.html',
		}) //
		.addEditor('/bank/receipts/:id', {
			templateUrl: 'views/amd-bank-receipt.html',
			controller: 'AmdBankReceiptCtrl',
			controllerAs: 'ctrl',
		})
		.addEditor('/discount/:discountId', {
			controller: 'AmdDiscountCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-discount-discount.html',
		});

});