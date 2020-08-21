mblowfish.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#roles', {
	title: 'Roles',
	description: 'Account will have any roles listed here.',
	templateUrl: 'scripts/module-user/wizards/account-create/rolesPage.html',
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
});