import templateUrl from './category-info.html';
export default {
	title: 'Category',
	description: 'A category is a group of services or products of shop.',
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
		return $wizard.data.title;
	}
}

