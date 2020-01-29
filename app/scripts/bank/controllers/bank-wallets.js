'use strict';

angular.module('ngMaterialDashboardBank')

	/**
	 * @ngdoc controller
	 * @name AmdBankWalletsCtrl
	 * @description Manages wallets
	 * 
	 */
	.controller('AmdBankWalletsCtrl', function ($scope, $bank, $navigator, $controller) {

	    // Extends with ItemsController
	    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	    }));

	    /*
	     * Overried the function
	     */
	    this.getModelSchema = function () {
		return $bank.walletSchema();
	    };

	    // get wallets
	    this.getModels = function (parameterQuery) {
		return $bank.getWallets(parameterQuery);
	    };

	    // get a wallet
	    this.getModel = function (id) {
		return $bank.getWallet(id);
	    };

	    // delete wallet
	    this.deleteModel = function (item) {
		return item.delete();
	    };

	    // create new 
	    this.createWallet = function () {
		$navigator.openPage('/wallets/new');
	    };

	    var ctrl = this;
	    this.addActions([{
		    title: 'New wallet',
		    icon: 'add',
		    action: function () {
			ctrl.createWallet();
		    }
		}]);

	    this.init({
		eventType: '/bank/wallets'
	    });
	});
