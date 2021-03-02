import Constants from '../../Constants';

export default {
	title: 'New Storage',
	description: 'Creates new asset storage to store products.',
	pages: [
		Constants.SDP_DRIVE_CREATE_WIZARD + '#type',
		Constants.SDP_DRIVE_CREATE_WIZARD + '#properties',
		Constants.SDP_DRIVE_CREATE_WIZARD + '#typeProperties',
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
		return $wizard.data.type && $wizard.data.title;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		return $mbActions.exec(SDP_DRIVES_CREATE_ACTION, {
			values: [$wizard.data]
		});
	},
}



