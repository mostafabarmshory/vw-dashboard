mblowfish.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#og', {
	title: 'Social Media',
	description: 'Fill the form to customize your page in social meda.',
	templateUrl: 'scripts/module-cms/wizards/new-page/ogPage.html',
	controllerAs: 'ctrl',
	controller: function($wizard) {
		'ngInject';

		var metadata = $wizard.data.metadata || {};

		// load from main page
		metadata['og:title'] = metadata['og:title'] || $wizard.data.title;
		metadata['og:description'] = metadata['og:description'] || $wizard.data.description;
		metadata['og:image'] = metadata['og:image'] || 'https://cdn.viraweb123.ir/api/v2/cdn/libs/templates@0.1.0/images/300x600.jpg';
		metadata['og:type'] = 'post';

		function setMetadata(key, value) {
			metadata[key] = value;
			$wizard.setData('metadata', metadata);
		}

		function getterSetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return metadata[key];
				}
				setMetadata(key, date);
			}
		}

		this.title = getterSetter('og:title');
		this.description = getterSetter('og:description');
		this.cover = getterSetter('og:image');
	}
});