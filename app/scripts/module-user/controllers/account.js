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
 * @ngdoc Controllers
 * @name AmdUserAccountCtrl
 * @description Manages an account
 */
mblowfish.controller('AmdUserAccountCtrl', function(
	/* AngularJS */ $scope, $usr, $state, $navigator, $mbResource, $mbTranslate, $q, $window,
	/* Seen User */ UserAccount, UserProfile) {

	this.roleLoading = true;
	this.groupLoading = true;
	this.userLoading = true;
	var ctrl = this;
	var account;
	var roles;
	var groups;
	var profile = new UserProfile();
	$scope.profile = profile;

	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	function remove() {
		$window.confirm($mbTranslate.instant('User will be deleted. There is no undo.'))//
			.then(function() {
				return $scope.account.delete();//
			})//
			.then(function() {
				$navigator.openPage('user/accounts');
			}, function() {
				alert($mbTranslate.instant('Failed to delete item.'));
			});
	}

	function update() {
		if (ctrl.userLoading) {
			return;
		}
		ctrl.userLoading = account.update().then(function() {
			$window.toast($mbTranslate.instant('Save is successfull.'));
		}).finally(function() {
			ctrl.userLoading = false;
		});
		return ctrl.userLoading;
	}

	this.updateProfile = function() {
		if (this.profileUpdating) {
			return;
		}
		this.profileUpdating = profile.update().then(function() {
			$window.toast($mbTranslate.instant('Save is successfull.'));
		}).finally(function() {
			delete ctrl.profileUpdating;
		});
		return this.profileUpdating;
	};


    /**
     * Update avatar of the current user
     * 
     * @name load
     * @memberof MbAccountCtrl
     * @returns {promiss} to update avatar
     */
	this.updateAvatar = function(file) {
		// XXX: maso, 1395: reset avatar
		if (ctrl.updatingAvatar) {
			return;
		}
		ctrl.updatingAvatar = account.uploadAvatar(file)//
			.then(function() {
				$window.toast($mbTranslate.instant('Your avatar updated successfully.'));
			}, function() {
				$window.alert($mbTranslate.instant('Failed to update avatar'));
			})//
			.finally(function() {
				delete ctrl.updatingAvatar;
			});
		return ctrl.updatingAvatar;
	}


	/**
	 * Removed all roles of user
	 */
	function removeRoles() {
		confirm($mbTranslate.instant('All roles of user will be removed.'))//
			.then(function() {
				var jobs = [];
				$scope.roles.forEach(function(item) {
					var promise = $scope.account.deleteRole(item);
					jobs.push(promise);
				});
				return $q.all(jobs);
			})//
			.then(function() {
				$navigator.openPage('ums/users');
			});
	}

	function changeRoles() {
		return $mbResource
			.get('/user/roles', {
				data: roles
			})
			.then(function(list) {
				// change roles and reload roles
				var jobs = [];
				list.forEach(function(item) {
					if (_findIndex(roles, item) < 0) {
						jobs.push(account.putRole(item));
					}
				});
				roles.forEach(function(item) {
					if (_findIndex(list, item) < 0) {
						jobs.push(account.deleteRole(item));
					}
				});
				$q.all(jobs).finally(function() {
					$scope.roles = roles = list;
				}).catch(function() {
					alert($mbTranslate.instant('An error occured while set roles.'));
				});
			});
	}

	function changeGroups() {
		return $mbResource
			.get('groups', {
				data: groups
			})
			.then(function(list) {
				// change groups and reload groups
				var jobs = [];
				list.forEach(function(item) {
					if (_findIndex(myData, item) < 0) {
						jobs.push(account.putGroup(item));
					}
				});
				groups.forEach(function(item) {
					if (_findIndex(list, item) < 0) {
						jobs.push(account.deleteGroup(item));
					}
				});
				$q.all(jobs).finally(function() {
					$scope.groups = groups = list;
				}).catch(function() {
					alert($mbTranslate.instant('An error occured while set groups.'));
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
		$window.confirm($mbTranslate.instant('Item will be deleted.'))//
			.then(function() {
				return $scope.account.deleteRole(role);
			})//
			.then(function() {
				var index = $scope.roles.indexOf(role);
				if (index > -1) {
					$scope.roles.splice(index, 1);
				}
			})//
			.finally(function() {
				ctrl.roleLoading = false;
			});
	}

	function removeGroup(group) {
		if (ctrl.groupLoading) {
			return;
		}
		ctrl.groupLoading = true;
		confirm($mbTranslate.instant('Item will be deleted.'))//
			.then(function() {
				return $scope.account.deleteGroup(group);
			})//
			.then(function() {
				var index = $scope.groups.indexOf(group);
				if (index > -1) {
					$scope.groups.splice(index, 1);
				}
			})//
			.finally(function() {
				ctrl.groupLoading = false;
			});
	}

	//===================================================================
	// Loading data
	//===================================================================
	function initRolesData(rolesData) {
		roles = rolesData;
		$scope.roles = roles;
	}

	function initGroupsData(groupsData) {
		groups = groupsData;
		$scope.groups = groups;
	}

	function initProfileData(proflieData) {
		profile.setData(proflieData);
	}

	function initAccountData(accountData) {
		account = new UserAccount(accountData);
		$scope.account = account;
	}

	function load() {
		if (ctrl.loading) {
			return ctrl.loading;
		}
		ctrl.loading = $usr.getAccount($state.params.userId, {
			graphql: '{' +
				'id,login,date_joined,last_login,is_active,' +
				'profiles{id,first_name,last_name,public_email,language,timezone,national_code,gender,weight,birthday},' +
				'roles{id,name,description,application,code_name},' +
				'groups{id,name,description}' +
				'}'
		})
			.then(function(accountData) {
				$scope.account = accountData;
				// groups
				initGroupsData(accountData.groups);
				delete accountData.groups;
				// roles
				initRolesData(accountData.roles);
				delete accountData.roles;
				// profile
				initProfileData(accountData.profiles[0]);
				delete accountData.profiles;
				// account
				initAccountData(accountData);
			})
			.finally(function() {
				delete ctrl.loading;
			});
		// XXX: maso, 2020: add a system to controlle jobs centeral
		//		return $app.pushJob(ctrl.loading, 'Loading account data');
	}


	$scope.remove = remove;
	$scope.update = update;
	$scope.removeRoles = removeRoles;

	$scope.changeRoles = changeRoles;
	$scope.changeGroups = changeGroups;

	$scope.removeRole = removeRole;
	$scope.removeGroup = removeGroup;

	load();
});
