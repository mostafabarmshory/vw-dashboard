
/**
 * @ngdoc Controller
 * @name AmdBankWalletChargeCtrl
 * @description # Charge a wallet
 * 
 */
angular.module('ngMaterialDashboardBank').controller('AmdBankWalletChargeCtrl', function($bank, $rootScope, QueryParameter, $window, $routeParams, $translate) {

	this.queryParameter = new QueryParameter();
	this.wallet = {};

	this.loadUserWallets = function() {
		if (this.loading) {
			return;
		}
		if (this.wallets) {
			return this.wallets;
		}
		this.loading = true;
		this.queryParameter.addFilter('owner_id', $rootScope.app.user.current.id);
		this.queryParameter.addFilter('deleted', false);
		var ctrl = this;
		return $bank.getWallets(this.queryParameter)//
			.then(function(response) {
				ctrl.loading = false;
				ctrl.wallets = response.items;
				ctrl.findInitialWallet();
				return ctrl.wallets;
			});
	};

	this.findInitialWallet = function() {
		if (!$routeParams.walletId) {
			return;
		}
		for (var i = 0; i < this.wallets.length; i++) {
			if (JSON.stringify(this.wallets[i].id) === $routeParams.walletId) {
				this.wallet = this.wallets[i];
				this.setCurrency();
				return;
			}
		}
	};

    /*
     * Find suitable currency for the wallet
     */
	this.setCurrency = function() {
		this.currency = this.wallet.currency;
		this.setCallbackUrl();
	};

    /*
     * Set callbackUrl which is needed in mb-pay directive
     */
	this.setCallbackUrl = function() {
		this.callbackUrl = '/wallets/' + this.wallet.id + '/payments/{{id}}';
	};

	this.pay = function(data) {
		data.title = $translate.instant('Charge wallet');
		data.amount = this.amount;
		data.description = $translate.instant('Charge ' + this.wallet.title);
		// create receipt and send to bank receipt page.
		return this.wallet.putPayment(data)
			.then(function(payment) {
				return $bank.getReceipt(payment.receipt_id)
					.then(function(receipt) {
						return receipt;
					});
			});
	};

	this.cancel = function() {
		$window.history.back();
	};
});
