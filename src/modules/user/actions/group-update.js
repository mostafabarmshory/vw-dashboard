
import {findIndexById} from '../../core/Utiles';


export default {
	icon: 'save',
	title: 'Update Group Roles',
	description: 'Update list of roles.',
	group: 'User',
	action: function($event, $mbQueue, $mbDispatcherUtil) {
		'ngInject';

		if (!$event.values) {
			// TODO: throw error
			return;
		}

		// change roles and reload roles
		var 
			group = $event.values[0],
			list = group.$roles,
			myData = group.roles,
			jobs = [];
		myData.forEach(function(item) {
			if (findIndexById(list, item) < 0) {
				jobs.push(group.putRole({
					'id': item.id,
					'role': item.id,
					'role_id': item.id
				}));
			}
		});
		list.forEach(function(item) {
			if (findIndexById(myData, item) < 0) {
				jobs.push(group.deleteRole(item));
			}
		});
		
		return $mbQueue.all(jobs)
			.finally(function() {
				// XXX: maso, 2021: must use list of roles
				$mbDispatcherUtil.fireCreated(AMD_USER_GROUPS_SP, [group]);
			});
	},
}





		//		//		var ctrl = {
		//		//			roleLoading: true,
		//		//			groupLoading: true,
		//		//			userLoading: true
		//		//		};
		//
		//		/**
		//		 * Remove the group
		//		 * 
		//		 * Remove current group from the backend.
		//		 * 
		//		 * @memberof AmdGroupCtrl
		//		 * @returns {promiss} to do 
		//		 */
		//		function remove() {
		//			return confirm($mbTranslate.instant('Group will be removed. There is no undo.'))
		//				.then(function() {
		//					return $scope.group.delete();//
		//				})//
		//				.then(function() {
		//					$mbLocation.url('ums/groups');
		//				}, function(/*error*/) {
		//					alert($mbTranslate.instant('Failed to delete item.'));
		//				});
		//		}
		//
		//		/**
		//		 * Save changes of the current group
		//		 * 
		//		 * Save the current group to the backend.
		//		 * 
		//		 * @memberof AmdGroupCtrl
		//		 * @return {promiss} to do 
		//		 */
		//		function save() {
		//			if (ctrl.groupLoading) {
		//				return;
		//			}
		//			ctrl.groupLoading = true;
		//			return $scope.group.update()//
		//				.then(function() {
		//					toast($mbTranslate.instant('Save is successfull.'));
		//				})//
		//				.finally(function() {
		//					ctrl.groupLoading = false;
		//				});
		//		}
		//
		//		function loadRoles() {
		//			ctrl.roleLoading = true;
		//			return $scope.group.getRoles()//
		//				.then(function(roles) {
		//					$scope.roles = roles;
		//				})//
		//				.finally(function() {
		//					ctrl.roleLoading = false;
		//				});
		//		}
		//
		//		function loadUsers() {
		//			ctrl.userLoading = true;
		//			return $scope.group.getAccounts()//
		//				.then(function(users) {
		//					$scope.users = users;
		//				})//
		//				.finally(function() {
		//					ctrl.userLoading = false;
		//				});
		//		}
		//
		//		function changeRoles($event) {
		//			var myData = $scope.roles ? $scope.roles.items : [];
		//			return $mbResource.get('roles', {
		//				data: myData,
		//				targetEvent: $event
		//			})//
		//				.then(function(list) {
		//					// change roles and reload roles
		//					var jobs = [];
		//					list.forEach(function(item) {
		//						if (_findIndex(myData, item) < 0) {
		//							var promise = $scope.group.putRole({
		//								'id': item.id,
		//								'role': item.id,
		//								'role_id': item.id
		//							});
		//							jobs.push(promise);
		//						}
		//					});
		//					myData.forEach(function(item) {
		//						if (_findIndex(list, item) < 0) {
		//							var promise = $scope.group.deleteRole(item);
		//							jobs.push(promise);
		//						}
		//					});
		//					$q.all(jobs)//
		//						.then(function() {
		//							loadRoles();
		//						}, function() {
		//							$scope.roles = myData;
		//							alert($mbTranslate.instant('An error occured while set roles.'));
		//						});
		//				});
		//		}
		//
		//		function _findIndex(array, item) {
		//			for (var i = 0; i < array.length; i++) {
		//				if (array[i].id === item.id) {
		//					return i;
		//				}
		//			}
		//			return -1;
		//		}
		//
		//		function removeRole(role) {
		//			if (ctrl.roleLoading) {
		//				return;
		//			}
		//			ctrl.roleLoading = true;
		//			confirm($mbTranslate.instant('Item will be deleted.'))//
		//				.then(function() {
		//					return $scope.group.deleteRole(role);
		//				})//
		//				.then(function() {
		//					var index = $scope.roles.items.indexOf(role);
		//					if (index > -1) {
		//						$scope.roles.items.splice(index, 1);
		//					}
		//				})//
		//				.finally(function() {
		//					ctrl.roleLoading = false;
		//				});
		//		}
		//
		//
		//		$scope.save = save;
		//		$scope.remove = remove;
		//
		//		$scope.changeRoles = changeRoles;
		//		$scope.removeRole = removeRole;