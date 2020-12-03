mblowfish.wizardPage(SDP_ASSET_CREATE_WIZARD + '#ebook-properties', {
	title: 'Properties',
	description: 'Each tag is known with name and description in the Dashboard. Fill the forme to define a new one.',
	templateUrl: 'scripts/module-sdp/wizards/new-asset/ebookPropertiesPage.html',
	controllerAs: 'ctrl',
	controller: function($wizard, $mbResource) {
		'ngInject';

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.title = createSetterGetter('title');
		this.abstract = createSetterGetter('abstract');
		this.cover = createSetterGetter('cover');
		this.isbn = createSetterGetter('isbn');
		this.edition = createSetterGetter('edition');
		this.date_published = createSetterGetter('date_published');
		this.pages = createSetterGetter('pages');
		this.age_range = createSetterGetter('age_range');
		this.language = createSetterGetter('language');
		var ctrl = this;
		this.setCover = function() {
			$mbResource
				.get('image-url', {
					multi: false
				})
				.then(function(url) {
					ctrl.cover(url);
				});
		};
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.title;
	}
});