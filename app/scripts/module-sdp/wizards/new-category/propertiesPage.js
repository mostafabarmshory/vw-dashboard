mblowfish.wizardPage(SDP_CATEGORY_CREATE_WIZARD + '#properties', {
	title: 'Properties',
	description: 'Each page is known with name, title and description in the Dashboard.',
	templateUrl: 'scripts/module-sdp/wizards/new-category/propertiesPage.html',
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