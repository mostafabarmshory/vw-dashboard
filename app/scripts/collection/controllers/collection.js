'use strict';

angular.module('ngMaterialDashboardCollection')

/**
 * @ngdoc controller
 * @name AmdBankGates
 * @description Manages bank backends
 * 
 */
.controller('AmdCollectionCtrl', function($scope, $navigator, /*$collection, */$routeParams, QueryParameter) {

	var paginatorParameter = new QueryParameter();
	paginatorParameter.setOrder('id', 'd');
	var requests = null;
	var ctrl = {
			state: 'ok',
			items: []
	};

	/**
	 * جستجوی درخواست‌ها
	 * 
	 * @param paginatorParameter
	 * @returns
	 */
	function find(query) {
		paginatorParameter.setQuery(query);
		paginatorParameter.setPage(0);
		reload();
	}

	/**
	 * لود کردن داده‌های صفحه بعد
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
		$scope.collection.documents(paginatorParameter)//
		.then(function(items) {
			requests = items;
			ctrl.items = ctrl.items.concat(requests.items);
			ctrl.status = 'ok';
		}, function(error) {
			ctrl.error = error;
			ctrl.status = 'fail';
		});
	}

	/**
	 * Adds new chiled
	 * @returns
	 */
	function addDocument(){
		$scope.collection.newDocument();
		reload();
	}


	/**
	 * Loads collection
	 * 
	 * @returns
	 */
	function reload(){
		$collection.collection($routeParams.id)//
		.then(function(collection){
			$scope.collection = collection;
			requests = null;
			ctrl.items = [];
			nextPage();
		}, function(error){
			$scope.collection = null;
			ctrl.status = 'notFound';
			ctrl.error = error;
		});
	}

	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	function remove(object) {
		confirm('delete item ' + object.id +'?')//
		.then(function(){
			return object.delete();//
		})//
		.then(function(){
			// TODO: maso, 1395: go to the model page
			var index = ctrl.items.indexOf(object);
			if (index > -1) {
				ctrl.items.splice(index, 1);
			}
			$location.path('/collection/' + $scope.collection.id);
		}, function(error){
			alert('fail to delete item:' + error.message);
		});

	}

	function removeCollection(){
		confirm('delete collection ' + $scope.collection.id +'?')//
		.then(function(){
		    return $scope.collection.delete()//
		})//
		.then(function(){
			$navigator.openPage('collections');
		}, function(error){
			alert('Fail to remove collection:' + error.data.message);
		});
	}

	$scope.items = [];
	$scope.reload = reload;
	$scope.search = find;
	$scope.nextPage = nextPage;

	$scope.remove = remove;
	$scope.removeCollection = removeCollection;
	$scope.add = addDocument;

	$scope.ctrl = ctrl;


	// Pagination toolbar
	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	$scope.sortKeys= [
		'id', 
		'name',
		'description'
		];
	$scope.moreActions=[{
		title: 'New document',
		icon: 'add',
		action: addDocument
	}];
});

