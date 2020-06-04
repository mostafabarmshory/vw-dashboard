
/**
 * @ngdoc controller
 * @name AmdBankWalletPaymentsCtrl
 * @description Load payments of a wallet
 * 
 */
mblowfish.controller('AmdBankWalletPaymentsCtrl', function ($scope, $state, $q, $translate, $bank, $navigator, $controller) {

    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope: $scope
    }));

    this.walletId = $state.params.walletId;

    /*
     * Load wallet
     */
    this.loadWallet = function () {
        if(this.wallet){
            return $q.when(this.wallet);
        }
        if (this.loadingWallet) {
            return this.loadingWallet;
        }
        var ctrl = this;
        this.loadingWallet = $bank.getWallet(this.walletId)//
        .then(function (wallet) {
            ctrl.wallet = wallet;
        }, function () {
            alert($translate.instant('Failed to load wallet'));
        })//
        .finally(function () {
            delete ctrl.loadingWallet;
        });
        return this.loadingWallet;
    };

    /*
     * Overried the function
     */
    this.getModelSchema = function () {
        var ctrl = this;
        return this.loadWallet()//
        .then(function () {
            return ctrl.wallet.paymentSchema();
        });
    };

    // get wallets
    this.getModels = function (parameterQuery) {
        var ctrl = this;
        return this.loadWallet()//
        .then(function () {
            return ctrl.wallet.getPayments(parameterQuery);
        });
    };

    this.init({
        eventType: '/bank/wallets'
    });
});
