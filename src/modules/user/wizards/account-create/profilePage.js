import templateUrl from './profilePage.html';

export default {
	title: 'Profile',
	description: 'Global profile of account which is accessible.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($usr, $wizard) {
		'ngInject';
		// TODO: use profile schema
		//		var ctrl = this;
		//		$usr.profileSchema()
		//			.then(function(schema) {
		//				ctrl.schema = schema;
		//			});
		//		ctrl.setProfile = function(profile) {
		//			ctrl.profile = profile;
		//			$wizard.setData('profile', profile);
		//		};
		//		ctrl.profile = $wizard.getData('profile');
		//		if (!ctrl.profile) {
		//			ctrl.setProfile({});
		//		}

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.first_name = createSetterGetter('first_name');
		this.last_name = createSetterGetter('last_name');
		this.public_email = createSetterGetter('public_email');
		this.language = createSetterGetter('language');
		this.timezone = createSetterGetter('timezone');
		this.national_code = createSetterGetter('national_code');
		this.gender = createSetterGetter('gender');
		this.weight = createSetterGetter('weight');
		this.birthday = createSetterGetter('birthday');
	}
}



