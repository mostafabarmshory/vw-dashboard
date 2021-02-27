
mblowfish.wizardPage(AMD_CMS_TERM_NEW_WIZARD + '#term', {
	title: 'Tearm',
	description: 'A term is a general lable of a content.',
	templateUrl: 'scripts/module-cms/wizards/new-term/term-page.html',
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
});

