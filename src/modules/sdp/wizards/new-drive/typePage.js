import templateUrl from './typePage.html';

export default {
	title: 'Storage Type',
	description: 'There are many types of storage to keep your asstes. Select your storage type from the list.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($wizard, $sdp) {
		'ngInject';
		var ctrl = this;
		$sdp.getDrivers()
			.then(function(list) {
				ctrl.drivers = list.items;
			});

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.type = createSetterGetter('type');

	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.type;
	}
}


