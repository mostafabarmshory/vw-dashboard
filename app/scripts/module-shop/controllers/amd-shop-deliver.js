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
 * @ngdoc Controller
 * @name AmdShopDeliveryCtrl
 * @description Controller of a Delivery
 */
mblowfish.controller('AmdShopDeliverCtrl', function($scope, $shop, $state, $mbTranslate, $location, $navigator, $q, QueryParameter) {

	var ctrl = {
		loading: false,
		updating: false,
		edit: false
	};

    /**
     * @name loadDelivery
     * @memberOf AmdShopDeliveryCtrl
     * @description Load the selected deliver
     */
	function loadDeliver() {
		if (ctrl.loading) {
			return;
		}
		ctrl.loading = true;
		$shop.getDeliver($state.params.deliverId)//
			.then(function(p) {
				$scope.deliver = p;
			}, function() {
				alert($mbTranslate.instant('Faild to load the deliver.'));
			})//
			.finally(function() {
				ctrl.loading = false;
			});
	}

    /**
     * @name remove
     * @memberOf AmdShopDeliveryCtrl
     * @description remove the selected deliver from the server
     */
	function remove() {
		confirm($mbTranslate.instant('Item will be deleted. There is no undo action.'))//
			.then(function() {
				return $scope.deliver.delete()//
					.then(function() {
						$location.path('/delivers/');
					}, function() {
						alert('Fail to delete the deliver.');
					});
			});
	}

    /**
     * @name save
     * @memberOf AmdShopDeliveryCtrl
     * @description Update the selected deliver
     */
	function save() {
		if (ctrl.updating) {
			return;
		}
		ctrl.updating = true;
		$scope.deliver.update()//
			.then(function(newDeliver) {
				$scope.deliver = newDeliver;
				ctrl.edit = false;
			}, function() {
				alert($mbTranslate.instant('Failed to update deliver.'));
			})//
			.finally(function() {
				ctrl.updating = false;
			});
	}

    /*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
     */
	$scope.remove = remove;
	$scope.save = save;
	$scope.ctrl = ctrl;

	loadDeliver();
});

