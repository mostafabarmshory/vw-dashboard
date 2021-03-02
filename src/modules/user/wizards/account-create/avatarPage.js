mblowfish.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#avatar', {
	title: 'Avatar',
	description: 'Avatar is used to present an account in wepabes, dashboard and etc.',
	templateUrl: 'scripts/module-user/wizards/account-create/avatarPage.html',
	controllerAs: 'ctrl',
	controller: function($scope, $wizard) {
		'ngInject';
		$scope.$watch('files.length', function(len) {
			var avatar;
			if (len > 0) {
				avatar = $scope.files[0];
			} else {
				avatar = undefined;
			}
			$wizard.setData('avatar', avatar);
		});
	}
});