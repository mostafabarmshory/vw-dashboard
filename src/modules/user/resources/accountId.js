
import templateUrl from './accountId.html';
import Constants from '../Constants';

export default {
	title: 'Account',
	templateUrl: templateUrl,
	tags: [Constants.AMD_USER_ACCOUNT_ID_RT, 'account_id'],
	controllerAs: 'ctrl',
	controller: function($scope, $resource, $controller) {
		'ngInject';
		angular.extend(this, $controller('MbSeenUserAccountsCtrl', {
			$scope: $scope
		}));
		var ctrl = this;
		var selectedAccountId;

		function setSelected(account) {
			selectedAccountId = account.id;
			$resource.setValue(selectedAccountId);
		}

		function isSelected(account) {
			return account.id === selectedAccountId;
		}

		_.assign(ctrl, {
			setSelected: setSelected,
			isSelected: isSelected,
		});
	}
}
