/**

There may be an specific types of asset. Here is list of supported assets:

- EBook
- Audio Book
- Video Book
- Article
- Cheatsheet
- Infographic
- Podcast
- Mangazine

 */
mblowfish.wizardPage(SDP_ASSET_CREATE_WIZARD + '#type', {
	title: 'Asset Type',
	description: 'Asset type defines the main category of assets. Select which type of asset you are about to add.',
	templateUrl: 'scripts/module-sdp/wizards/new-asset/typePage.html',
	controllerAs: 'ctrl',
	controller: function($wizard) {
		'ngInject';
		this.media_types = [{
			title: 'EBook',
			value: 'ebook'
		}, {
			title: 'Audio Book',
			value: 'audio_book'
		}, {
			title: 'Video Book',
			value: 'video_book'
		}, {
			title: 'Article',
			value: 'article'
		}, {
			title: 'Cheatsheet',
			value: 'cheatsheet'
		}, {
			title: 'Infographic',
			value: 'infographic'
		}, {
			title: 'Podcast',
			value: 'podcast'
		}, {
			title: 'Mangazine',
			value: 'mangazine'
		}];

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.media_type = createSetterGetter('media_type');

	},
	nextPage: function($wizard) {
		'ngInject';
		var key;
		switch ($wizard.data.media_type) {
			case 'ebook':
				key = '#type';
				break;
			default:
				key = '#notsupport';
				break;
		}
		return SDP_ASSET_CREATE_WIZARD + key;
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.media_type;
	}
});