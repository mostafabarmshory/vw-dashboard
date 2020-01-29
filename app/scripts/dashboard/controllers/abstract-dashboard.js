'use strict';

/**
 * @ngdoc Controllers
 * @name AmdAbstractDashboardCtrl
 * @description Dashboard abstract controller
 * 
 */
angular.module('ngMaterialDashboard')
.controller('AmdAbstractDashboardCtrl', function ($scope) {
    
    this.init = function(){
        this.loadDashboardData()
        .then(function(data){
            $scope.model = data;
        });
    };
});


