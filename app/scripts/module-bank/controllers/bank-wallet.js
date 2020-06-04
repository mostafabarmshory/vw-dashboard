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
 * @name AmdBankWalletCtrl
 * @description Manage a wallet
 * 
 */
mblowfish.controller('AmdBankWalletCtrl', function($bank, $location, $state, $translate) {

	this.walletId = $state.params.walletId;

	this.load = function() {
		if (this.loading) {
			return;
		}
		this.loading = true;
		var ctrl = this;
		return $bank.getWallet(this.walletId)//
			.then(function(wallet) {
				ctrl.wallet = wallet;
			}, function() {
				alert($translate.instant('Failed to load wallet'));
			})//
			.finally(function() {
				ctrl.loading = false;
			});
	};

	this.remove = function() {
		var ctrl = this;
		confirm($translate.instant('The wallet will be deleted.'))//
			.then(function() {
				return ctrl.wallet.delete();//
			})//
			.then(function() {
				$location.path('/wallets');
			}, function() {
				alert($translate.instant('Failed to delete wallet'));
			});
	};

	this.update = function() {
		if (this.saving) {
			return;
		}
		this.saving = true;
		var ctrl = this;
		return this.wallet.update()//
			.then(function(wallet) {
				ctrl.wallet = wallet;
			}, function() {
				alert($translate.instant('Failed to save wallet'));
			})
			.finally(function() {
				ctrl.saving = false;
			});
	};

	this.load();
});
