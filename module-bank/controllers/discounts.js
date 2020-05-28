


/**
 * @ngdoc controller
 * @name AmdDiscountsCtrl
 * @description Manages list of all discounts
 * 
 * 
 */
angular.module('ngMaterialDashboardBank').controller('AmdDiscountsCtrl', function($scope, /*$discount, */$navigator, QueryParameter) {

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
