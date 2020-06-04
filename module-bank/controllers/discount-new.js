'use strict';

angular.module('ngMaterialDashboardBank')

/**
 * @ngdoc controller
 * @name AmdDiscountNewCtrl
 * @description Manages a new discount view
 */
.controller('AmdDiscountNewCtrl', function($scope, /*$discount, */$mbResource, $navigator) {

	var ctrl = {
			savingDiscount : false
	};

	function cancel() {
		$navigator.openPage('discounts');
	}

	function add(config) {
		ctrl.savingDiscount = true;
		var data = config.model;
		$discount.newDiscount(data)//
		.then(function(obj) {
			ctrl.savingDiscount = false;
			$navigator.openPage('discounts');
		}, function(error) {
			ctrl.savingDiscount = false;
			var message = 'Fail to create new discount.';
			if(error.data){
				message = error.data.message;
			}
			alert('Fail to create discount:' + error.data.message);
		});
	}

	/**
	 * Load banks
	 * 
	 * @returns
	 */
	function loadDiscountTypes()
	{
		return $discount.discountTypes()//
		.then(function(dTypes){
			$scope.discountTypes = dTypes;
		});
	}

	$scope.selectUser = function(){
		return $mbResource.get('userId')//
		.then(function(userId){
			$scope.config.model.user = userId;
		})
	};

	$scope.cancel = cancel;
	$scope.add = add;
	$scope.loadDiscountTypes = loadDiscountTypes;
	$scope.ctrl = ctrl;
});
