import templateUrl from './rolesPage.html';
export default {
	title: 'Roles',
	description: 'Account will have any roles listed here.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($controller, $scope, $wizard) {
		'ngInject';
		angular.extend(this, $controller('MbSeenUserRolesCtrl', {
			$scope: $scope
		}));
		var ctrl = this;
		ctrl.roles = $wizard.getData('roles') || [];

		this.setRoles = function(roles) {
			if (!roles) {
				roles = [];
			}
			$wizard.setData('roles', roles);
			ctrl.selectedItem = undefined;
			ctrl.searchText = undefined;
		};

		this.setSearchString = function(query) {
			return this.setQueryString(query)
				.then(function() {
					return ctrl.items;
				});
		};
	},
	isPageComplete: function() {
		'ngInject';
		// TODO: check if the login exist
		return true;
	}
}


