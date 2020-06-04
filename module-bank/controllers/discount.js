'use strict';

angular.module('ngMaterialDashboardBank')

/**
 * @ngdoc function
 * @name ngMaterialDashboardDiscount.controller:DiscountCtrl
 * @description # DiscountCtrl Controller of the ngMaterialDashboardDiscount
 */
.controller('AmdDiscountCtrl', function($scope, /*$discount,*/ $navigator, $state, $location) {

	var ctrl = {
			loadingDiscount : true,
			savingDiscount : false,
			items: [],
			edit: false
	};
	var discount;


	function handlError(){
		alert('faile to load discount');
	}

	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	function remove() {
		confirm('delete discount ' + $scope.discount.id +'?')//
		.then(function(){
			return $scope.discount.delete();//
		})//
		.then(function(){
			// TODO: maso, 1395: go to the model page
			$location.path('discounts');
		}, function(error){
			alert('fail to delete discount:' + error.message);
		});
	}

	function save(){
		ctrl.savingDiscount = true;
		discount.update()//
		.then(function(){
			ctrl.edit=false;
			ctrl.savingDiscount = false;
		}, function(){
			alert('An error is occured while updating discount.');
			ctrl.savingDiscount = false;			
		});
	}

	/*
	 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
	 */
	$scope.remove = remove;
	$scope.save = save;

	$scope.ctrl = ctrl;
//
//	// Load discount
//	$discount.discount($state.params.discountId)//
//	.then(function(a){
//		discount = a;
//		$scope.discount = a;
//		ctrl.loadingDiscount = false;
//		return a;
//	}, handlError);
});

