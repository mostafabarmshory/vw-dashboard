mblowfish.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#properties', {
	title: 'Properties',
	description: 'Each page is known with name, title and description in the Dashboard.',
	templateUrl: 'scripts/module-cms/wizards/new-page/propertiesPage.html',
	controllerAs: 'ctrl',
	controller: function($wizard, $mbCrypto) {
		'ngInject';

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			}
		}

		this.name = createSetterGetter('name');
		this.title = createSetterGetter('title');
		this.description = createSetterGetter('description');
		
		this.randomName = function(){
			this.name($mbCrypto.uuid());
		};
	},
	nextPage: AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#type',
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.name;
	}
});