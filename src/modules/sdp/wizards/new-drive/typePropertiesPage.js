import templateUrl from './typePropertiesPage.html';

export default {
	title: 'Storage Properites',
	description: 'Storeages needs some properties to use. Fill the form based on your storage type.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($wizard, $sdp) {
		'ngInject';
		this.properties = [];
		this.data = $wizard.data;

		var ctrl = this;
		$sdp.getDriver($wizard.data.type)
			.then(function(properties) {
				ctrl.properties = properties.children;
			});

		this.updateData = function(date) {
			_.forEach(date, function(value, key) {
				$wizard.setData(key, value);
			});
		};

	},
//	isPageComplete: function($wizard) {
//		'ngInject';
//		return $wizard.data.name;
//	}
}