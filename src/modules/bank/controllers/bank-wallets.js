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
/**
 * @ngdoc controller
 * @name AmdBankWalletsCtrl
 * @description Manages wallets
 * 
 */
mblowfish.controller('AmdBankWalletsCtrl', function($scope, $bank, $navigator, $controller) {

	// Extends with ItemsController
	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	}));

	/*
	 * Overried the function
	 */
	this.getModelSchema = function() {
		return $bank.walletSchema();
	};

	// get wallets
	this.getModels = function(parameterQuery) {
		return $bank.getWallets(parameterQuery);
	};

	// get a wallet
	this.getModel = function(id) {
		return $bank.getWallet(id);
	};

	// delete wallet
	this.deleteModel = function(item) {
		return item.delete();
	};

	// create new 
	this.createWallet = function() {
		$navigator.openPage('/wallets/new');
	};

	var ctrl = this;
	this.addActions([{
		title: 'New wallet',
		icon: 'add',
		action: function() {
			ctrl.createWallet();
		}
	}]);

	this.init({
		eventType: '/bank/wallets'
	});
});
