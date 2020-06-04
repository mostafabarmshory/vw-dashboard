
/**
 * @ngdoc Controller
 * @name AmdBankWalletTransferCtrl
 * @description # Wallet to wallet transfer
 * 
 */
mblowfish.controller('AmdBankWalletToWalletCtrl', function($bank, $rootScope, QueryParameter, $window, $state, $translate) {

	this.queryParameter = new QueryParameter();
	this.sourceWallet = {};


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
				ctrl.wallets = response.items;
				ctrl.findInitialWallet();
				return ctrl.wallets;
			});
	};

	this.findInitialWallet = function() {
		if (!$state.params.fromId) {
			return;
		}
		for (var i = 0; i < this.wallets.length; i++) {
			if (JSON.stringify(this.wallets[i].id) === $state.params.fromId) {
				this.sourceWallet = this.wallets[i];
				return;
			}
		}
	};

	this.transfer = function() {
		if (this.transfering) {
			return;
		}
		if (this.destWalletId === this.sourceWallet.id) {
			this.message = 'Two wallets are equal. Transfering is impossible';
			return;
		}
		this.transfering = true;
		var ctrl = this;
		return this.sourceWallet.putTransfer({
			to_wallet_id: this.destWalletId,
			amount: this.amount,
			description: this.description
		})//
			.then(function(transfer) {
				$window.history.back();
			}, function(error) {
				alert($translate.instant('Failed to transfer'));
			})
			.finally(function() {
				ctrl.transfering = false;
			});
	};

	this.cancel = function() {
		$window.history.back();
	};

//	this.loadUserWallets();

});
