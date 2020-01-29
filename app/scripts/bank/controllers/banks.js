'use strict';

angular.module('ngMaterialDashboardBank')

/**
 * @ngdoc controller
 * @name AmdBankGates
 * @description Manages bank backends
 * 
 */
.controller('AmdBanksCtrl', function ($scope, $bank, $controller) {

    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope: $scope
    }));

    /*
     * Overried the function
     */
    this.getModelSchema = function () {
        return $bank.engineSchema();
    };

    // get engines
    this.getModels = function (parameterQuery) {
        return $bank.getEngines(parameterQuery);
    };

    // get a engine
    this.getModel = function (id) {
        return $bank.getEngine(id);
    };
    
    // delete a engine
    this.deleteModel = function (id) {
        return $bank.deleteEngine(id);
    };

    this.init({
        eventType: '/bank/engines'
    });
});
