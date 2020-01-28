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
 * @name AmdUserCtrl
 * @description Creates new user
 */
.controller('AmdUserCtrl', function ($scope, $usr, $routeParams, $navigator, $resource, $translate, $q) {

	var ctrl = {
			roleLoading: true,
			groupLoading: true,
			userLoading: true
	};
	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	function remove() {
		confirm($translate.instant('User will be deleted. There is no undo.'))//
		.then(function(){
			return $scope.user.delete();//
		})//
		.then(function(){
			$navigator.openPage('ums/users');
		}, function(){
			alert($translate.instant('Failed to delete item.'));
		});
	}
	
	function update(){
		if(ctrl.userLoading){
			return;
		}
		ctrl.userLoading = true;
		return $scope.user.update()//
		.then(function(){
			toast($translate.instant('Save is successfull.'));
		})//
		.finally(function(){
			ctrl.userLoading = false;
		});
	}

	/**
	 * Removed all roles of user
	 */
	function removeRoles() {
		confirm($translate.instant('All roles of user will be removed.'))//
		.then(function(){
			var jobs = [];
			$scope.roles.items.forEach(function(item){
				var promise = $scope.user.deleteRole(item);
				jobs.push(promise);
			});
			return $q.all(jobs);
		})//
		.then(function(){
			$navigator.openPage('ums/users');
		});
	}

	function loadRoles(){
		ctrl.roleLoading = true;
		return $scope.user.getRoles()//
		.then(function(roles){
			$scope.roles = roles;
		})//
		.finally(function(){
			ctrl.roleLoading = false;
		});
	}
	
	function loadGroups(){
		ctrl.groupLoading = true;
		return $scope.user.getGroups()//
		.then(function(groups){
			$scope.groups = groups;
		})//
		.finally(function(){
			ctrl.groupLoading = false;
		});
	}

	function load() {
		ctrl.userLoading = true;
		return $usr.getAccount($routeParams.userId)//
		.then(function(user){
			$scope.user = user;
			loadRoles();
			loadGroups();
		})//
		.finally(function(){
			ctrl.userLoading = false;
		});
	}

	function changeRoles(){
		var myData = $scope.roles ? $scope.roles.items : [];
		return $resource.get('roles', {
			data: myData
		})//
		.then(function(list){
			// change roles and reload roles
			var jobs = [];
			list.forEach(function(item){
				if(_findIndex(myData, item) < 0){
					var promise = $scope.user.putRole({
						'id': item.id,
						'role': item.id,
						'role_id': item.id
					});
					jobs.push(promise);
				}
			});
			myData.forEach(function(item){
				if(_findIndex(list, item) < 0){
					var promise = $scope.user.deleteRole(item);
					jobs.push(promise);
				}
			});
			$q.all(jobs)//
			.then(function(){
				loadRoles();
			}, function(){
				$scope.roles = myData;
				alert($translate.instant('An error occured while set roles.'));
			});
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
					var promise = $scope.user.putGroup({
						'id': item.id,
						'group': item.id,
						'group_id': item.id,
					});
					jobs.push(promise);
				}
			});
			myData.forEach(function(item){
				if(_findIndex(list, item) < 0){
					var promise = $scope.user.deleteGroup(item);
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
	
	function _findIndex(array, item){
		for(var i=0; i <array.length; i++){
			if(array[i].id === item.id){
				return i;
			}
		}
		return -1;
	}
	
	function removeRole(role) {
		if(ctrl.roleLoading){
			return;
		}
		ctrl.roleLoading = true;
		confirm($translate.instant('Item will be deleted.'))//
		.then(function(){
		    return $scope.user.deleteRole(role);
		})//
		.then(function(){
			var index = $scope.roles.items.indexOf(role);
			if (index > -1) {
				$scope.roles.items.splice(index, 1);
			}
		})//
		.finally(function(){
			ctrl.roleLoading = false;
		});
	}
	
	function removeGroup(group) {
		if(ctrl.groupLoading){
			return;
		}
		ctrl.groupLoading = true;
		confirm($translate.instant('Item will be deleted.'))//
		.then(function(){
		    return $scope.user.deleteGroup(group);
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
	
	$scope.remove = remove;
	$scope.update = update;
	$scope.removeRoles = removeRoles;
	
	$scope.changeRoles = changeRoles;
	$scope.changeGroups = changeGroups;
	
	$scope.removeRole = removeRole;
	$scope.removeGroup = removeGroup;
	
	$scope.ctrl = ctrl;
	load();
});
