mblowfish.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#type', {
	title: 'Page Type',
	description: 'Select which type of page do you want to create.',
	templateUrl: 'scripts/module-cms/wizards/new-page/typePage.html',
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

		this.type = createSetterGetter('type');
		if (!$wizard.data.type) {
			$wizard.setData('type', 'wb');
		}
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.type;
	}
});