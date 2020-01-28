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
'use strict';

angular.module('ngMaterialDashboardUser')


/**
 * @ngdoc controller
 * @name AmdRoleCtrl
 * @property {boolean} groupLoading  Is true if controller is working on groups.
 * @property {boolean} roleLoading   Is true if controller is working on role.
 * @property {boolean} userLoading   Is true if controller is working on users.
 * @description Manages a role view
 * 
 */
.controller('AmdRoleCtrl', function ($scope, $usr, $routeParams, $navigator, $resource, $translate, $q) {

	var ctrl = {
			roleLoading: true,
			groupLoading: true,
			userLoading: true
	};

	/**
	 * Remove current role from server
	 *  
	 * @memberof AmdRoleCtrl
	 * @return {promiss} to do the remove process
	 */
	function remove() {
		return confirm($translate.instant('Role will be removed. There is no undo.'))
		.then(function(){
			return $scope.role.delete();//
		})//
		.then(function(){
			$navigator.openPage('ums/roles');
		}, function(/*error*/){
			alert($translate.instant('Failed to delete item.'));
		});
	}
	
	/**
	 * Save current role
	 * 
	 * Save all changes to the current role.
	 * 
	 * @memberof AmdRoleCtrl
	 * @return {promiss} to save changes
	 */
	function save(){
		if(ctrl.roleLoading){
			return;
		}
		ctrl.roleLoading = true;
		return $scope.role.update()//
		.then(function(){
			toast($translate.instant('Save is successfull.'));
		})//
		.finally(function(){
			ctrl.roleLoading = false;
		});
	}
	
	function loadGroups(){
		ctrl.groupLoading = true;
		return $scope.role.getGroups()//
		.then(function(groups){
			$scope.groups = groups;
		})//
		.finally(function(){
			ctrl.groupLoading = false;
		});
	}

	function loadUsers(){
		ctrl.userLoading = true;
		return $scope.role.getAccounts()//
		.then(function(users){
			$scope.users = users;
		})//
		.finally(function(){
			ctrl.userLoading = false;
		});
	}

	function load() {
		ctrl.roleLoading = true;
		return $usr.getRole($routeParams.roleId)//
		.then(function(role){
			$scope.role = role;
			loadGroups();
			loadUsers();
		})//
		.finally(function(){
			ctrl.roleLoading = false;
		});
	}

	function changeGroups(){
		var myData = $scope.groups ? $scope.groups.items : [];
		return $resource.get('groups', {
			data: myData
		})//
		.then(function(list){
			// change groups and reload groups
			var jobs = [];
			list.forEach(function(item){
				if(_findIndex(myData, item) < 0){
					var promise = $scope.role.putGroup(item);
					jobs.push(promise);
				}
			});
			myData.forEach(function(item){
				if(_findIndex(list, item) < 0){
					var promise = $scope.role.deleteGroup(item);
					jobs.push(promise);
				}
			});
			$q.all(jobs)//
			.then(function(){
				loadGroups();
			}, function(){
				$scope.groups = myData;
				alert($translate.instant('An error occured while set groups.'));
			});
		});
	}
	
	function changeUsers(){
		var myData = $scope.users ? $scope.users.items : [];
		return $resource.get('accounts', {
			data: myData
		})//
		.then(function(list){
			// change users and reload users
			var jobs = [];
			list.forEach(function(item){
				if(_findIndex(myData, item) < 0){
					var promise = $scope.role.putAccount(item);
					jobs.push(promise);
				}
			});
			myData.forEach(function(item){
				if(_findIndex(list, item) < 0){
					var promise = $scope.role.deleteAccount(item);
					jobs.push(promise);
				}
			});
			$q.all(jobs)//
			.then(function(){
				loadUsers();
			}, function(){
				$scope.users = myData;
				alert($translate.instant('An error occured while set users.'));
			});
		});
	}
	
	function _findIndex(array, item){
		for(var i=0; i <array.length; i++){
			if(array[i].id === item.id){
				return i;
			}
		}
		return -1;
	}
	
	function removeGroup(group) {
		if(ctrl.groupLoading){
			return;
		}
		ctrl.groupLoading = true;
		confirm($translate.instant('Item will be deleted.'))//
		.then(function(){
		    return $scope.role.deleteGroup(group);
		})//
		.then(function(){
			var index = $scope.groups.items.indexOf(group);
			if (index > -1) {
				$scope.groups.items.splice(index, 1);
			}
		})//
		.finally(function(){
			ctrl.groupLoading = false;
		});
	}
	
	function removeUser(user) {
		if(ctrl.userLoading){
			return;
		}
		ctrl.userLoading = true;
		confirm($translate.instant('Item will be deleted.'))//
		.then(function(){
		    return $scope.role.deleteAccount(user);
		})//
		.then(function(){
			var index = $scope.users.items.indexOf(user);
			if (index > -1) {
				$scope.users.items.splice(index, 1);
			}
		})//
		.finally(function(){
			ctrl.userLoading = false;
		});
	}
	
	$scope.save = save;
	$scope.remove = remove;
	
	$scope.changeGroups = changeGroups;
	$scope.changeUsers = changeUsers;
	
	$scope.removeGroup = removeGroup;
	$scope.removeUser = removeUser;
	
	$scope.ctrl = ctrl;
	load();
});
