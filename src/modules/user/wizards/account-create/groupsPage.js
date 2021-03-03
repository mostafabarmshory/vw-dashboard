import templateUrl from './groupsPage.html';

export default {
	title: 'Groups',
	description: 'Account will be a member of groups listed here.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($controller, $scope, $wizard) {
		'ngInject';
		angular.extend(this, $controller('MbSeenUserGroupsCtrl', {
			$scope: $scope
		}));
		var ctrl = this;
		ctrl.groups = $wizard.getData('groups') || [];

		this.setGroups = function(groups) {
			if (!groups) {
				groups = [];
			}
			$wizard.setData('groups', groups);
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


