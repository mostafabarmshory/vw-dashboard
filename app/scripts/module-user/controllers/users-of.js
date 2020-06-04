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
 * @name AmdUsersOfCtrl
 * @description Manages list of user from an object
 */
mblowfish.controller('AmdUsersOfCtrl', function($scope, $usr, $state, $mbResource, QueryParameter) {

	var paginatorParameter = new QueryParameter();
	var requests = null;
	var ctrl = {
		items: [],
		working: false
	};

	function handleError(error) {
		var message = '';
		if (error.data) {
			message = error.data.message;
		}
		alert('Fail to change:' + message);
		ctrl.working = false;
	}

	/**
	 * جستجوی درخواست‌ها
	 * 
	 * @param paginatorParameter
	 * @returns
	 */
	function find(query) {
		paginatorParameter.setQuery(query);
		reload();
	}

	/**
	 * لود کردن داده‌های صفحه بعد
	 * 
	 * @returns
	 */
	function nextPage() {
		if (ctrl.working || !$scope.object) {
			return;
		}
		if (requests && !requests.hasMore()) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}
		// start state (device list)
		ctrl.working = true;
		$scope.object.getAccounts(paginatorParameter)//
			.then(function(items) {
				requests = items;
				ctrl.items = ctrl.items.concat(requests.items);
			}, handleError)//
			.finally(function() {
				ctrl.working = false;
			});
	}

	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	function remove(user) {
		if (ctrl.working) {
			return;
		}
		confirm('delete user from this list?')//
			.then(function() {
				ctrl.working = true;
				return $scope.object.deleteAccount(user);
			})//
			.then(function() {
				var index = ctrl.items.indexOf(user);
				if (index > -1) {
					ctrl.items.splice(index, 1);
				}
			}, handleError)//
			.finally(function() {
				ctrl.working = false;
			});
	}

	function _internal_reload() {
		requests = null;
		ctrl.items = [];
		nextPage();
	}

	/**
	 * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
	 * 
	 * @returns
	 */
	function reload() {
		if ($state.params.objectType === 'group') {
			return $usr.getGroup($state.params.objectId)//
				.then(function(group) {
					$scope.object = group;
					_internal_reload();
				});
		} else if ($state.params.objectType === 'role') {
			return $usr.getRole($state.params.objectId)//
				.then(function(role) {
					$scope.object = role;
					_internal_reload();
				});
		}
	}

	/**
	 * Add new user to the object
	 */
	function addUser() {
		ctrl.working = true;
		$mbResource
			.get('userId')//
			.then(function(userId) {
				return $scope.object.putAccount({
					'id': userId,
					'user': userId,
					'user_id': userId
				});
			})//
			.then(function() {
				ctrl.working = false;
				_internal_reload();
			}, handleError);
	}

	/*
	 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
	 */
	$scope.reload = reload;
	$scope.search = find;
	$scope.nextPage = nextPage;

	$scope.remove = remove;
	$scope.addUser = addUser;

	$scope.ctrl = ctrl;
	$scope.paginatorParameter = paginatorParameter;
	$scope.sortKeys = [
		'id',
		'name'
	];
	$scope.sortKeysTitles = [
		'ID',
		'Name'
	];
	$scope.moreActions = [{
		title: 'New user',
		icon: 'add',
		action: addUser
	}];
});
