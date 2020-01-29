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
'use strict';

angular.module('ngMaterialDashboardBank')
	/**
	 * 
	 */
	.config(function($routeProvider) {
		$routeProvider //
			.when('/wallets', {
				controller: 'AmdBankWalletsCtrl',
				controllerAs: 'ctrl',
				templateUrl: 'views/amd-bank-wallets.html',
				navigate: true,
				protect: function($rootScope) {
					return !$rootScope.app.user.tenant_owner;
				},
				name: 'Wallets',
				groups: ['bank'],
				icon: 'account_balance_wallet',
				hidden: '!app.user.tenant_owner'
			}) //
			.when('/wallets/new', {
				controller: 'AmdBankWalletNewCtrl',
				templateUrl: 'views/amd-bank-wallet-new.html',
				controllerAs: 'ctrl',
				navigate: false,
				name: 'New wallet',
				groups: ['bank'],
				icon: 'add',
				protect: true
			}) //
			.when('/my-wallets', {
				controller: 'AmdBankWalletsCtrl',
				templateUrl: 'views/amd-bank-my-wallets.html',
				controllerAs: 'ctrl',
				navigate: true,
				protect: true,
				name: 'My wallets',
				groups: ['bank'],
				icon: 'account_balance_wallet'
			})//
			.when('/wallet-to-wallet', {
				templateUrl: 'views/amd-bank-wallet-to-wallet.html',
				controller: 'AmdBankWalletToWalletCtrl',
				controllerAs: 'ctrl',
				navigate: true,
				name: 'Wallet to wallet',
				icon: 'swap_horiz',
				groups: ['bank'],
				protect: true
			}) //
			.when('/wallets/charge', {
				templateUrl: 'views/amd-bank-wallet-charge.html',
				controller: 'AmdBankWalletChargeCtrl',
				controllerAs: 'ctrl',
				navigate: true,
				name: 'Charge wallet',
				icon: 'battery_charging_80',
				groups: ['bank'],
				protect: true
			})//
			.when('/wallets/:walletId/payments/:paymentId', {
				templateUrl: 'views/amd-bank-wallet-payment.html',
				controller: 'AmdBankWalletPaymentCtrl',
				controllerAs: 'ctrl',
				protect: true
			})//
			.when('/wallets/:walletId', {
				templateUrl: 'views/amd-bank-wallet.html',
				controller: 'AmdBankWalletCtrl',
				controllerAs: 'ctrl',
				protect: true
			});



		$routeProvider //
			.when('/bank/gates', {
				controller: 'AmdBankGatesCtrl',
				templateUrl: 'views/amd-bank-gates.html',
				navigate: true,
				protect: function($rootScope) {
					return !$rootScope.app.user.tenant_owner;
				},
				name: 'Bank gates',
				groups: ['bank'],
				icon: 'attach_money',
				hidden: '!app.user.tenant_owner'
			}) //
			.when('/bank/gates/new', {
				controller: 'AmdBankGateNewCtrl',
				templateUrl: 'views/amd-bank-gate-new.html',
				//navigate : true,
				name: 'New bank gate',
				groups: ['bank'],
				icon: 'add',
				protect: function($rootScope) {
					return !$rootScope.app.user.tenant_owner;
				}
			}) //
			.when('/bank/gates/:gateId', {
				controller: 'AmdBankGateCtrl',
				templateUrl: 'views/amd-bank-gate.html',
				protect: function($rootScope) {
					return !$rootScope.app.user.tenant_owner;
				}
			}) //
			.when('/bank/banks', {
				controller: 'AmdBanksCtrl',
				controllerAs: 'ctrl',
				templateUrl: 'views/amd-bank-banks.html',
				navigate: true,
				name: 'Bank engines',
				icon: 'attach_money',
				groups: ['bank'],
				hidden: '!app.user.tenant_owner',
				protect: function($rootScope) {
					return !$rootScope.app.user.tenant_owner;
				}
			}) //
			//		    .when('/bank/banks/:bankType', {
			//			controller: 'AmdBankCtrl',
			//			templateUrl: 'views/amd-bank-bank.html',
			//			protect: function ($rootScope) {
			//			    return !$rootScope.app.user.tenant_owner;
			//			}
			//		    })
			.when('/bank/receipts', {
				controller: 'AmdBankReceiptsCtrl',
				templateUrl: 'views/amd-bank-receipts.html',
				navigate: true,
				name: 'Recipts',
				icon: 'receipt',
				groups: ['bank'],
				protect: function($rootScope) {
					return !$rootScope.app.user.tenant_owner;
				}
			})
			.when('/bank/receipts/:id', {
				templateUrl: 'views/amd-bank-receipt.html',
				controller: 'AmdBankReceiptCtrl',
				controllerAs: 'ctrl'
			});

		$routeProvider//
			.when('/discounts', {
				controller: 'AmdDiscountsCtrl',
				templateUrl: 'views/amd-discount-discounts.html',
				name: 'Discounts',
				icon: 'money_off',
				groups: ['discount-management'],
				navigate: true,
				protect: true,
			})//
			.when('/discounts/new', {
				controller: 'AmdDiscountNewCtrl',
				templateUrl: 'views/amd-discount-new.html',
				name: 'New Discount',
				icon: 'card_giftcard',
				groups: ['discount-management'],
				navigate: true,
				protect: true,
			})//
			.when('/discount/:discountId', {
				controller: 'AmdDiscountCtrl',
				templateUrl: 'views/amd-discount-discount.html',
				protect: true,
			});
	});
