import templateUrl from './tenant-info.html';
export default {
	title: 'Tenant',
	description: 'A tenant is a stand alone site with list of users.',
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

		this.title = createSetterGetter('title');
		this.description = createSetterGetter('description');
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.title;
	}
}

