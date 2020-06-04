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



mblowfish.config(function($mbViewProvider, $mbEditorProvider) {

	var viewGroups = ['Finance'];

	$mbViewProvider //
		.addView('/wallets', {
			title: 'Wallets',
			icon: 'account_balance_wallet',
			controller: 'AmdBankWalletsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-bank-wallets.html',
			groups: viewGroups,
		})
		.addView('/wallets-new', {
			title: 'New wallet',
			icon: 'add',
			controller: 'AmdBankWalletNewCtrl',
			templateUrl: 'views/amd-bank-wallet-new.html',
			controllerAs: 'ctrl',
			groups: viewGroups,
		})
		.addView('/my-wallets', {
			title: 'My wallets',
			icon: 'account_balance_wallet',
			controller: 'AmdBankWalletsCtrl',
			templateUrl: 'views/amd-bank-my-wallets.html',
			controllerAs: 'ctrl',
			groups: viewGroups,
		})
		.addView('/wallet-to-wallet', {
			title: 'Wallet to wallet',
			icon: 'swap_horiz',
			templateUrl: 'views/amd-bank-wallet-to-wallet.html',
			controller: 'AmdBankWalletToWalletCtrl',
			controllerAs: 'ctrl',
			groups: viewGroups,
		})
		.addView('/wallets-charge', {
			title: 'Charge wallet',
			icon: 'battery_charging_80',
			templateUrl: 'views/amd-bank-wallet-charge.html',
			controller: 'AmdBankWalletChargeCtrl',
			controllerAs: 'ctrl',
			groups: viewGroups,
		})
		.addView('/bank/gates', {
			title: 'Bank gates',
			icon: 'attach_money',
			controller: 'AmdBankGatesCtrl',
			templateUrl: 'views/amd-bank-gates.html',
			groups: viewGroups,
		})
		.addView('/bank/gates-new', {
			title: 'New bank gate',
			icon: 'add',
			controller: 'AmdBankGateNewCtrl',
			templateUrl: 'views/amd-bank-gate-new.html',
			groups: viewGroups,
		})
		.addView('/bank/banks', {
			title: 'Bank engines',
			icon: 'attach_money',
			controller: 'AmdBanksCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-bank-banks.html',
			groups: viewGroups,
		})
		.addView('/bank/receipts', {
			title: 'Recipts',
			icon: 'receipt',
			controller: 'AmdBankReceiptsCtrl',
			templateUrl: 'views/amd-bank-receipts.html',
			groups: viewGroups,
		})
		.addView('/discounts', {
			title: 'Discounts',
			icon: 'money_off',
			controller: 'AmdDiscountsCtrl',
			templateUrl: 'views/amd-discount-discounts.html',
			groups: viewGroups,
		})
		.addView('/discounts-new', {
			title: 'New Discount',
			icon: 'card_giftcard',
			controller: 'AmdDiscountNewCtrl',
			templateUrl: 'views/amd-discount-new.html',
			groups: viewGroups,
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