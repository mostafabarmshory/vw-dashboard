import tempalteUrl from './avatarPage.html';

export default {
	title: 'Avatar',
	description: 'Avatar is used to present an account in wepabes, dashboard and etc.',
	templateUrl: tempalteUrl,
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
}


