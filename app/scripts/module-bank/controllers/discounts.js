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
 * @name AmdDiscountsCtrl
 * @description Manages list of all discounts
 * 
 * 
 */
mblowfish.controller('AmdDiscountsCtrl', function($scope, /*$discount, */$navigator, QueryParameter) {

	var paginatorParameter = new QueryParameter();
	paginatorParameter.setOrder('id', 'd');
	var requests = null;
	var ctrl = {
		loadDiscounts: false,
		status: 'relax',
		items: []
	};

	/**
	 * Search for discounts
	 * 
	 * @NOTE This function is added to $scope
	 * 
	 * @memberof AmdDiscountsCtrl
	 * @param query
	 * @returns promiss
	 */
	function find(query) {
		paginatorParameter.setQuery(query);
		paginatorParameter.setPage(1);
		return reload();
	}

	/**
	 * لود کردن داده‌های صفحه بعد
	 * 
	 * @returns
	 */
	function nextPage() {
		if (ctrl.loadDiscounts || ctrl.status === 'working') {
			return;
		}
		if (requests && !requests.hasMore()) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}
		ctrl.status = 'working';
		ctrl.loadDiscounts = true;
		$discount.discounts(paginatorParameter)//
			.then(function(items) {
				requests = items;
				ctrl.items = ctrl.items.concat(requests.items);
				ctrl.status = 'relax';
				ctrl.loadDiscounts = false;
			}, function() {
				ctrl.status = 'fail';
				ctrl.loadDiscounts = false;
			});
	}


	function addDiscount() {
		$navigator.openPage('discounts/new');
	}

	/**
	 * تمام حالت‌های کنترلر را دوباره مقدار دهی می‌کند.
	 * 
	 * @returns
	 */
	function reload() {
		requests = null;
		ctrl.items = [];
		paginatorParameter.setPage(1);
		nextPage();
	}

	/**
	 * دسته مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param SdpDiscount
	 * @returns
	 */
	function remove(object) {
		return object.delete()//
			.then(function() {
				var index = ctrl.items.indexOf(object);
				if (index > -1) {
					ctrl.items.splice(index, 1);
				}
			});
	}

	$scope.items = [];
	$scope.reload = reload;
	$scope.search = find;
	$scope.nextPage = nextPage;
	$scope.remove = remove;
	$scope.add = addDiscount;
	$scope.ctrl = ctrl;

	$scope.paginatorParameter = paginatorParameter;
	$scope.sortKeys = ['id',//
		'code',//
		'type',//
		'count',//
		'remain_count', //
		'off_value',
		'valid_day', //
		'user', //
		'name', //
		'creation_dtime'];

	$scope.moreActions = [{
		title: 'New discount',
		icon: 'add',
		action: $scope.add
	}];

});
