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
 * @name AmdDiscountNewCtrl
 * @description Manages a new discount view
 */
mblowfish.controller('AmdDiscountNewCtrl', function($scope, $discount, $mbResource, $navigator) {

	var ctrl = {
		savingDiscount: false
	};

	function cancel() {
		$navigator.openPage('discounts');
	}

	function add(config) {
		ctrl.savingDiscount = true;
		var data = config.model;
		$discount
			.newDiscount(data)//
			.then(function(/*obj*/) {
				ctrl.savingDiscount = false;
				$navigator.openPage('discounts');
			}, function(error) {
				ctrl.savingDiscount = false;
				var message = 'Fail to create new discount.';
				if (error.data) {
					message = error.data.message;
				}
				alert(message);
			});
	}

	/**
	 * Load banks
	 * 
	 * @returns
	 */
	function loadDiscountTypes() {
		return $discount.discountTypes()//
			.then(function(dTypes) {
				$scope.discountTypes = dTypes;
			});
	}

	$scope.selectUser = function($event) {
		return $mbResource.get('userId', {
			targetEvent: $event
		})//
			.then(function(userId) {
				$scope.config.model.user = userId;
			});
	};

	$scope.cancel = cancel;
	$scope.add = add;
	$scope.loadDiscountTypes = loadDiscountTypes;
	$scope.ctrl = ctrl;
});
