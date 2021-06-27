
import * as Constants from '../../Constants';

export default {
	title: 'New Page',
	description: 'Creates new page which are used in WEB.',
	pages: [
		Constants.AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#properties',
		Constants.AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#type',
		Constants.AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#metadata',
		Constants.AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#og',
		// TODO: add extra pages
	],

	/*
	Validate data on changes
	*/
	onChange: function() {
		'ngInject';
		// TODO:
	},
	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		// TODO
		return $wizard.data.name;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		var mimeType,
			content,
			data = $wizard.data;
		switch (data.type) {
			default:
			case 'wb':
				mimeType = 'application/weburger+json';
				content = '{}';
				break;
			case 'html':
				mimeType = 'text/html';
				content = '<h2>Html Page</h2>';
				break;
			case 'svg':
				mimeType = 'image/svg+xml';
				content = '<svg width="100" height="100"></svg>';
				break;
			case 'txt':
				mimeType = 'text/plain';
				content = 'Text Page';
				break;
			case 'md':
				mimeType = 'text/markdown';
				content = '##Text Page';
				break;
		}
		data.media_type = 'page';
		data.mime_type = mimeType;
		data.content = content;

		// convert metadata map to list
		var metadata = data.metadata || {};
		data.metadata = [];
		_.forEach(metadata, function(value, key) {
			data.metadata.push({
				key: key,
				value: value
			});
		});

		return $mbActions.exec(AMD_CMS_CONTENTS_NEWPAGE_ACTION, {
			values: [data]
		});
	},
}




