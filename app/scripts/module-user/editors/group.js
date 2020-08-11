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
@ngdoc Editor
@name AmdGroupCtrl
@property {boolean} groupLoading  Is true if controller is working on group.
@property {boolean} roleLoading   Is true if controller is working on roles.
@property {boolean} userLoading   Is true if controller is working on users.
@description Controller of a group

Manages a group view
 */
mblowfish.controller('/ums/groups/:groupId', {
	templateUrl: 'views/user/editors/group.html',
	controllerAs: 'ctrl',
	protect: true,
	/* @ngInject */
	controller: function($scope, $usr, $state, $navigator, $mbResource, $mbTranslate, $q) {

		var ctrl = {
			roleLoading: true,
			groupLoading: true,
			userLoading: true
		};

		/**
		 * Remove the group
		 * 
		 * Remove current group from the backend.
		 * 
		 * @memberof AmdGroupCtrl
		 * @returns {promiss} to do 
		 */
		function remove() {
			return confirm($mbTranslate.instant('Group will be removed. There is no undo.'))
				.then(function() {
					return $scope.group.delete();//
				})//
				.then(function() {
					$navigator.openPage('ums/groups');
				}, function(/*error*/) {
					alert($mbTranslate.instant('Failed to delete item.'));
				});
		}

		/**
		 * Save changes of the current group
		 * 
		 * Save the current group to the backend.
		 * 
		 * @memberof AmdGroupCtrl
		 * @return {promiss} to do 
		 */
		function save() {
			if (ctrl.groupLoading) {
				return;
			}
			ctrl.groupLoading = true;
			return $scope.group.update()//
				.then(function() {
					toast($mbTranslate.instant('Save is successfull.'));
				})//
				.finally(function() {
					ctrl.groupLoading = false;
				});
		}

		function loadRoles() {
			ctrl.roleLoading = true;
			return $scope.group.getRoles()//
				.then(function(roles) {
					$scope.roles = roles;
				})//
				.finally(function() {
					ctrl.roleLoading = false;
				});
		}

		function loadUsers() {
			ctrl.userLoading = true;
			return $scope.group.getAccounts()//
				.then(function(users) {
					$scope.users = users;
				})//
				.finally(function() {
					ctrl.userLoading = false;
				});
		}

		function load() {
			ctrl.groupLoading = true;
			return $usr.getGroup($state.params.groupId)//
				.then(function(group) {
					$scope.group = group;
					loadRoles();
					loadUsers();
				})//
				.finally(function() {
					ctrl.groupLoading = false;
				});
		}

		function changeRoles() {
			var myData = $scope.roles ? $scope.roles.items : [];
			return $mbResource.get('roles', {
				data: myData
			})//
				.then(function(list) {
					// change roles and reload roles
					var jobs = [];
					list.forEach(function(item) {
						if (_findIndex(myData, item) < 0) {
							var promise = $scope.group.putRole({
								'id': item.id,
								'role': item.id,
								'role_id': item.id
							});
							jobs.push(promise);
						}
					});
					myData.forEach(function(item) {
						if (_findIndex(list, item) < 0) {
							var promise = $scope.group.deleteRole(item);
							jobs.push(promise);
						}
					});
					$q.all(jobs)//
						.then(function() {
							loadRoles();
						}, function() {
							$scope.roles = myData;
							alert($mbTranslate.instant('An error occured while set roles.'));
						});
				});
		}

		function changeUsers() {
			var myData = $scope.users ? $scope.users.items : [];
			return $mbResource.get('accounts', {
				data: myData
			})//
				.then(function(list) {
					// change users and reload users
					var jobs = [];
					list.forEach(function(item) {
						if (_findIndex(myData, item) < 0) {
							var promise = $scope.group.putAccount(item);
							jobs.push(promise);
						}
					});
					myData.forEach(function(item) {
						if (_findIndex(list, item) < 0) {
							var promise = $scope.group.deleteAccount(item);
							jobs.push(promise);
						}
					});
					$q.all(jobs)//
						.then(function() {
							loadUsers();
						}, function() {
							$scope.users = myData;
							alert($mbTranslate.instant('An error occured while set users.'));
						});
				});
		}

		function _findIndex(array, item) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].id === item.id) {
					return i;
				}
			}
			return -1;
		}

		function removeRole(role) {
			if (ctrl.roleLoading) {
				return;
			}
			ctrl.roleLoading = true;
			confirm($mbTranslate.instant('Item will be deleted.'))//
				.then(function() {
					return $scope.group.deleteRole(role);
				})//
				.then(function() {
					var index = $scope.roles.items.indexOf(role);
					if (index > -1) {
						$scope.roles.items.splice(index, 1);
					}
				})//
				.finally(function() {
					ctrl.roleLoading = false;
				});
		}

		function removeUser(user) {
			if (ctrl.userLoading) {
				return;
			}
			ctrl.userLoading = true;
			confirm($mbTranslate.instant('Item will be deleted.'))//
				.then(function() {
					return $scope.group.deleteAccount(user);
				})//
				.then(function() {
					var index = $scope.users.items.indexOf(user);
					if (index > -1) {
						$scope.users.items.splice(index, 1);
					}
				})//
				.finally(function() {
					ctrl.userLoading = false;
				});
		}

		$scope.save = save;
		$scope.remove = remove;

		$scope.changeRoles = changeRoles;
		$scope.changeUsers = changeUsers;

		$scope.removeRole = removeRole;
		$scope.removeUser = removeUser;

		$scope.ctrl = ctrl;
		load();
	}
});
