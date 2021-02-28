import templateUrl from './term-page.html';
export default {
	title: 'Tearm',
	description: 'A term is a general lable of a content.',
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
		this.slug = createSetterGetter('slug');
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.name &&
			$wizard.data.slug;
	}
}

