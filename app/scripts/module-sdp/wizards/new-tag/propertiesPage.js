mblowfish.wizardPage(SDP_TAG_CREATE_WIZARD + '#properties', {
	title: 'Properties',
	description: 'Each tag is known with name and description in the Dashboard. Fill the forme to define a new one.',
	templateUrl: 'scripts/module-sdp/wizards/new-tag/propertiesPage.html',
	controllerAs: 'ctrl',
	controller: function($wizard, $mbCrypto) {
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

		this.randomName = function() {
			this.name($mbCrypto.uuid());
		};
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.name;
	}
});