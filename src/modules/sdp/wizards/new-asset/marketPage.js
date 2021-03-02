import templateUrl from './marketPage.html';

export default {
	title: 'Market',
	description: 'Price, state and other properties are used in selling and market.',
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

		this.price = createSetterGetter('price');
		this.state = createSetterGetter('state');
		// Not supported in the current version
		//		this.parent = createSetterGetter('parent');
		//		this.owner = createSetterGetter('owner');
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.name;
	}
}