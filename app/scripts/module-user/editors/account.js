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
@name AmdUserAccountCtrl
@description 
Edit an account and details sucha as profiles, avatar, roles and groups.
 */
mblowfish.addEditor('/ums/accounts/:accountId', {
	templateUrl: 'scripts/module-user/editors/account.html',
	controllerAs: 'ctrl',
	controller: function(
	/* AngularJS */ $usr, $state, $q, $window, $editor,
	/* Mblowfish */ $mbResource, $mbTranslate,
	/* Seen User */ UserAccount, UserProfile) {
		'ngInject';

		//------------------------------------------------------------
		// Variables
		//------------------------------------------------------------
		var ctrl = this;
		var accountId = $state.params.accountId;

		var GRAPHQL_QUERY = '{' +
			'id,login,date_joined,last_login,is_active,' +
			'profiles{id,first_name,last_name,public_email,language,timezone,national_code,gender,weight,birthday},' +
			'roles{id,name,description,application,code_name},' +
			'groups{id,name,description}' +
			'}';
		var account;
		var roles;
		var groups;
		var profile = new UserProfile();


		//		function findIndex(array, item) {
		//			for (var i = 0; i < array.length; i++) {
		//				if (array[i].id === item.id) {
		//					return i;
		//				}
		//			}
		//			return -1;
		//		}

		//------------------------------------------------------------
		// Functions: Account
		//------------------------------------------------------------
		function deleteAccount() {
			confirm($mbTranslate.instant('Delete Account (no undo)?'))//
				.then(function() {
					return account.delete();//
				})//
				.then(function() {
					$editor.close();
				}, function() {
					alert($mbTranslate.instant('Failed to delete account.'));
				});
		}

		function updateAccount() {
			if (ctrl.accountLoading) {
				return;
			}
			ctrl.accountLoading = account.update()
				.then(function() {
					toast($mbTranslate.instant('Account is saved successfully.'));
				}).finally(function() {
					ctrl.userLoading = false;
				});
			return ctrl.accountLoading;
		}

		//------------------------------------------------------------
		// Functions: Avatar
		//------------------------------------------------------------

		/**
		 * Update avatar of the current user
		 * 
		 * @name load
		 * @memberof MbAccountCtrl
		 * @returns {promiss} to update avatar
		 */
		function updateAvatar(file) {
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

		//------------------------------------------------------------
		// Functions: Roles
		//------------------------------------------------------------

		function deleteRole(role) {
			if (ctrl.roleLoading) {
				return;
			}
			ctrl.roleLoading = true;
			confirm($mbTranslate.instant('Item will be deleted.'))//
				.then(function() {
					return account.deleteRole(role);
				})//
				.then(function() {
					var index = roles.indexOf(role);
					if (index > -1) {
						roles.splice(index, 1);
					}
				})//
				.finally(function() {
					ctrl.roleLoading = false;
				});
		}
		/**
		 * Removed all roles of user
		 */
		function removeRoles() {
			confirm($mbTranslate.instant('All roles of user will be removed.'))//
				.then(function() {
					var jobs = [];
					roles.forEach(function(item) {
						var promise = account.deleteRole(item);
						jobs.push(promise);
					});
					return $q.all(jobs);
				});
		}

		function addRoles() {
			return $mbResource
				.get(AMD_USER_ROLES_RT, {
					$values: roles,
					$style: {
						title: 'Select new roles',
						multi: true,
					}
				})
				.then(function(list) {
					// change roles and reload roles
					var jobs = [];
					list.forEach(function(item) {
						jobs.push(account.putRole(item));
					});
					$q.all(jobs)
						.finally(function() {
							roles = list;
						}).catch(function() {
							alert($mbTranslate.instant('An error occured while set roles.'));
						});
				});
		}


		//------------------------------------------------------------
		// Functions: groups
		//------------------------------------------------------------

		function deleteGroup(group) {
			if (ctrl.groupLoading) {
				return;
			}
			ctrl.groupLoading = true;
			confirm($mbTranslate.instant('Item will be deleted.'))//
				.then(function() {
					return account.deleteGroup(group);
				})//
				.then(function() {
					var index = groups.indexOf(group);
					if (index > -1) {
						groups.splice(index, 1);
					}
				})//
				.finally(function() {
					ctrl.groupLoading = false;
				});
		}

		function addGroups() {
			return $mbResource
				.get(AMD_USER_GROUPS_RT, {
					$valu: groups,
					$style: {
						multi: true,
						title: 'Select new groups'
					}
				})
				.then(function(list) {
					// change groups and reload groups
					var jobs = [];
					list.forEach(function(item) {
						jobs.push(account.putGroup(item));
					});
					$q.all(jobs)
						.finally(function() {
							groups = list;
						}).catch(function() {
							alert($mbTranslate.instant('An error occured while set groups.'));
						});
				});
		}

		//------------------------------------------------------------
		// Functions: Profiles
		//------------------------------------------------------------
		function updateProfile() {
			if (ctrl.profileUpdating) {
				return;
			}
			this.profileUpdating = profile.update()
				.then(function() {
					toast($mbTranslate.instant('Profile is saved successfully.'));
				}).finally(function() {
					delete ctrl.profileUpdating;
				});
			return ctrl.profileUpdating;
		}

		//------------------------------------------------------------
		// Functions: reload
		//------------------------------------------------------------
		function initRolesData(rolesData) {
			roles = rolesData;
			ctrl.roles = roles;
		}

		function initGroupsData(groupsData) {
			groups = groupsData;
			ctrl.groups = groups;
		}

		function initProfileData(proflieData) {
			profile.setData(proflieData || {});
			ctrl.profile = profile;
		}

		function initAccountData(accountData) {
			account = new UserAccount(accountData);
			ctrl.account = account;
		}

		/**
		Reload the account details
		
		@memberof AmdUserAccountCtrl
		 */
		function reload() {
			if (ctrl.loading) {
				return ctrl.loading;
			}
			ctrl.loading = $usr
				.getAccount(accountId, {
					graphql: GRAPHQL_QUERY
				})
				.then(function(accountData) {
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
		}


		//------------------------------------------------------------
		// Editor Api
		//------------------------------------------------------------
		ctrl.roleLoading = true;
		ctrl.groupLoading = true;
		ctrl.userLoading = true;

		//>> Functions
		ctrl = _.assign(ctrl, {
			//>> Variables
			loading: false,
			accountLoading: false,
			avatarLoading: false,
			profileLoading: false,
			roleLoading: false,
			groupLoading: false,

			account: undefined,
			roles: undefined,
			groups: undefined,
			profile: undefined,
			avatar: undefined,

			//>> General
			reload: reload,
			//>> account api
			deleteAccount: deleteAccount,
			updateAccount: updateAccount,
			//>> profiel api
			updateProfile: updateProfile,
			//>> avatar api
			updateAvatar: updateAvatar,
			//>> roolse api
			deleteRole: deleteRole,
			deleteRoles: removeRoles,
			addRoles: addRoles,
			//>> groups api
			deleteGroup: deleteGroup,
			addGroups: addGroups,
		});

		//------------------------------------------------------------
		// End
		//------------------------------------------------------------
		//>> load
		reload();
	}
});


