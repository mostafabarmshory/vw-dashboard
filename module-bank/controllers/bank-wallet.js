'use strict';

angular.module('ngMaterialDashboardBank')

	/**
	 * @ngdoc controller
	 * @name AmdBankWalletCtrl
	 * @description Manage a wallet
	 * 
	 */
	.controller('AmdBankWalletCtrl', function ($bank, $location, $routeParams, $translate) {

	    this.walletId = $routeParams.walletId;

	    this.load = function () {
		if (this.loading) {
		    return;
		}
		this.loading = true;
		var ctrl = this;
		return $bank.getWallet(this.walletId)//
			.then(function (wallet) {
			    ctrl.wallet = wallet;
			}, function () {
			    alert($translate.instant('Failed to load wallet'));
			})//
			.finally(function () {
			    ctrl.loading = false;
			});
	    }; 
	    
	    this.remove = function () {
		var ctrl = this;
		confirm($translate.instant('The wallet will be deleted.'))//
			.then(function () {
			    return ctrl.wallet.delete();//
			})//
			.then(function () {
			    $location.path('/wallets');
			}, function () {
			    alert($translate.instant('Failed to delete wallet'));
			});
	    };

	    this.update = function () {
		if (this.saving) {
		    return;
		}
		this.saving = true;
		var ctrl = this;
		return this.wallet.update()//
			.then(function (wallet) {
			    ctrl.wallet = wallet;
			}, function () {
			    alert($translate.instant('Failed to save wallet'));
			})
			.finally(function () {
			    ctrl.saving = false;
			});
	    };

	    this.load();
	});
