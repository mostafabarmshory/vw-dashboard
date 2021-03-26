
import templateUrl from './groupPage.html';

export default {
	title: 'Group',
	description: 'Group information is used to identicate a group.',
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

		this.name = createSetterGetter('name');
		this.description = createSetterGetter('description');
	},
	isPageComplete: function($wizard) {
		'ngInject';
		// TODO: check if the login exist
		return $wizard.data.name;
	}
}