

mblowfish.wizard(SDP_DRIVE_CREATE_WIZARD, {
	title: 'New Storage',
	description: 'Creates new asset storage to store products.',
	pages: [
		SDP_DRIVE_CREATE_WIZARD + '#type',
		SDP_DRIVE_CREATE_WIZARD + '#properties',
		SDP_DRIVE_CREATE_WIZARD + '#typeProperties',
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
});


