mblowfish.resource('amd-seen-user-account_id', {
	title: 'Account',
	templateUrl: 'scripts/module-user/resources/accountId.html',
	tags: [AMD_USER_ACCOUNT_ID_RT, 'account_id'],
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
});
