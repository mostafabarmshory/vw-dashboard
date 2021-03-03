import templateUrl from './credentialPage.html';

export default {
	title: 'Account',
	description: 'Account information is used to identicate an account.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($wizard) {
		'ngInject';

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.password = createSetterGetter('password');
		this.confirm_password = createSetterGetter('confirm_password');

	},
	isPageComplete: function($wizard) {
		'ngInject';
		var data = $wizard.data;
		return data.password && data.password === data.confirm_password;
	}
}

