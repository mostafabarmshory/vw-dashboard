mblowfish.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#metadata', {
	title: 'Metadata',
	description: 'You can improve page SEO by adding common metada.',
	templateUrl: 'scripts/module-cms/wizards/new-page/metadataPage.html',
	controllerAs: 'ctrl',
	controller: function($wizard) {
		'ngInject';

		var metadata = $wizard.data.metadata || {};

		// load from main page
		metadata.title = metadata.title || $wizard.data.title;
		metadata.description = metadata.description || $wizard.data.description;
		metadata['link.favicon'] = metadata['link.favicon'] || '/api/v2/cms/contents/favicon/content';
		metadata['link.cover'] = metadata['link.cover'] || 'https://cdn.viraweb123.ir/api/v2/cdn/libs/templates@0.1.0/images/300x600.jpg';

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
			};
		}

		this.setMetadata = setMetadata;
		this.title = getterSetter('title');
		this.description = getterSetter('description');
		this.language = getterSetter('language');

		this.favicon = getterSetter('link.favicon');
		this.cover = getterSetter('link.cover');
	}
});