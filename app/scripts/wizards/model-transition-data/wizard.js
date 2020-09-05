

mblowfish.wizard(SEEN_MODEL_TRANSITION_DATA_WIZARD, {
	title: 'New Transition',
	description: 'Performs a transition on a model.',
	pages: [
		SEEN_MODEL_TRANSITION_DATA_WIZARD + '#properties',
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
	performFinish: function() {
		'ngInject';
	},
});


