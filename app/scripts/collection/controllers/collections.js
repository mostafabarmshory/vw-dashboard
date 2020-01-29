'use strict';

angular.module('ngMaterialDashboardCollection')

/**
 * @ngdoc controller
 * @name AmdBankGates
 * @description Manages bank backends
 * 
 */
.controller('AmdCollectionsCtrl', function($scope, /*$collection, */QueryParameter, $navigator ) {

	var paginatorParameter = new QueryParameter();
	paginatorParameter.setOrder('id', 'd');
	var requests = null;
	var ctrl = {
			state: 'ok',
			items: []
	};

	/**
	 * Loading collection list
	 * 
	 * @returns
	 */
	function nextPage() {
		if (ctrl.status === 'working') {
			return;
		}
		if (requests && !requests.hasMore()) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}
		// start state (device list)
		ctrl.status = 'working';
		$collection.collections(paginatorParameter)//
		.then(function(items) {
			requests = items;
			ctrl.items = ctrl.items.concat(requests.items);
			ctrl.status = 'ok';
		}, function() {
			ctrl.status = 'fail';
		});
	}


	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	function remove(pobject) {
		confirm('delete collection ' + object.id +'?')//
		.then(function(){
		   return pobject.delete();
		})//
		.then(function(){
			var index = ctrl.items.indexOf(pobject);
			if (index > -1) {
				ctrl.items .splice(index, 1);
			}
			$location.path('collections');
		}, function(error){
		    alert('fail to delete collection:' + error.message);
		});
	}

	/**
	 * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
	 * 
	 * @returns
	 */
	function reload(){
		requests = null;
		ctrl.items = [];
		nextPage();
	}

	function addCollection(){
		$navigator.openPage('collections/new');
	}
	
	/*
	 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری
	 * شده است.
	 */
	$scope.items = [];
	$scope.nextPage = nextPage;
	$scope.remove = remove;
	$scope.addCollection = addCollection;
	$scope.ctrl = ctrl;

	// Pagination
	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	$scope.sortKeys= [
		'id', 'creation_dtime'
		];
	$scope.moreActions=[{
		title: 'New collection',
		icon: 'add',
		action: addCollection
	}];

});
