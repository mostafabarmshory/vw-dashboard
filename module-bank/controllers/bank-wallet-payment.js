'use strict';

angular.module('ngMaterialDashboardBank')

	/**
	 * @ngdoc controller
	 * @name AmdBankWalletPaymentCtrl
	 * @description Manage payments of a wallet
	 * 
	 */
	.controller('AmdBankWalletPaymentCtrl', function ($bank, $navigator, $state, $translate) {

	    this.walletId = $state.params.walletId;
	    this.paymentId = $state.params.paymentId;

	    this.paymentChecked = false;

	    /*
	     * load wallet
	     */
	    this.load = function () {
		if (this.loading) {
		    return;
		}
		this.loading = true;
		var ctrl = this;
		return $bank.getWallet(this.walletId)//
			.then(function (wallet) {
			    ctrl.wallet = wallet;
			    ctrl.loadPayment();
			}, function () {
			    alert($translate.instant('Failed to load wallet'));
			})//
			.finally(function () {
			    ctrl.loading = false;
			});
	    };

	    /*
	     * load payment
	     */
	    this.loadPayment = function () {
		if (this.loadingPayment) {
		    return;
		}
		this.loadingPayment = true;
		var ctrl = this;
		//TODO: masood,2019: Check for graphql
		return this.wallet.getPayment(this.paymentId)//
			.then(function (payment) {
			    ctrl.paymentChecked = true;
			    ctrl.payment = payment;
			    //TODO: masood,2019: Get with graphql
			    return $bank.getReceipt(payment.receipt_id);
			}, function () {
			    alert($translate.instant('Failed to load payment'));
			})//
			.then(function (receipt) {
			    ctrl.receipt = receipt;
			})//
			.finally(function () {
			    ctrl.loadingPayment = false;
			});
	    };

	    this.pay = function () {
		$navigator.openPage('bank/receipts/' + this.receipt.id);
	    };

	    this.load();
	});
