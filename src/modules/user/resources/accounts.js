import templateUrl from './accounts.html';
import Constants from '../Constants';

export default {
	title: 'Account',
	templateUrl: templateUrl,
	tags: [Constants.AMD_USER_ACCOUNTS_RT],
	controllerAs: 'ctrl',
	controller: function($scope, $resource, $controller) {
		'ngInject';
		angular.extend(this, $controller('MbSeenUserAccountsCtrl', {
			$scope: $scope
		}));
		var ctrl = this;

		function setSelected(account, selected) {
			// update account
			if (_.isUndefined(selected)) {
				selected = true;
			}
			account.selected = selected;

			// update list
			var items = [];
			_.forEach(ctrl.items, function(item) {
				if (item.selected) {
					items.push(item);
				} else {
					delete item.selected;
				}
			});
			$resource.setValue(items);
		}

		function isSelected(account) {
			return account.selected;
		}

		_.assign(ctrl, {
			setSelected: setSelected,
			isSelected: isSelected,
		});
	}
}



