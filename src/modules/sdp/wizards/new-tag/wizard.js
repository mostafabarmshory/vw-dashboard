import Constants from '../../Constants';

export default {
	title: 'New Tag',
	description: 'Creates new tag to put products in groups.',
	pages: [
		Constants.SDP_TAG_CREATE_WIZARD + '#properties',
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
		return $mbActions.exec(Constants.SDP_TAGS_CREATE_ACTION, {
			values: [$wizard.data]
		});
	},
}




