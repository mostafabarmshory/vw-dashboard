
/**
 * @ngdoc Controller
 * @name AmdBankWalletChargeCtrl
 * @description # Charge a wallet
 * 
 */
mblowfish.controller('AmdBankWalletChargeCtrl', function($bank, $rootScope, QueryParameter, $window, $state, $translate) {

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
		if (!$state.params.walletId) {
			return;
		}
		for (var i = 0; i < this.wallets.length; i++) {
			if (JSON.stringify(this.wallets[i].id) === $state.params.walletId) {
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
