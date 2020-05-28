


/**
 * @ngdoc controller
 * @name AmdBankWalletNewCtrl
 * @description Create new wallet
 */
angular.module('ngMaterialDashboardBank').controller('AmdBankWalletNewCtrl', function($bank, $navigator, $translate, $http) {

	this.creatingWallet = false;

	this.cancel = function() {
		$navigator.openPage('/wallets');
	};

	this.currencies = {};
	var ctrl = this;
	$http({
		method: 'GET',
		url: 'resources/currencies.json'
	}).then(function(response) {
		ctrl.currencies = response.data;
	});

	this.add = function(wallet) {
		if (this.creatingWallet) {
			return;
		}
		this.creatingWallet = true;
		var ctrl = this;
		$bank.putWallet(wallet).then(function(wallet) {
			ctrl.creatingWallet = false;
			$navigator.openPage('/wallets');
		}, function() {
			ctrl.creatingWallet = false;
			alert($translate.instant('Fail to create new wallet'));
		});
	};
});
