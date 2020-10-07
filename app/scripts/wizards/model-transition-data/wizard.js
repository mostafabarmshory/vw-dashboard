

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
	canFinish: function() {
		'ngInject';
		// TODO: check the data is valid
		return true;
	},

	/*
	Perform final job
	*/
	performFinish: function($mbActions, $values, $transition, $storePath, $wizard) {
		'ngInject';
		return $mbActions.exec(SEEN_MODEL_TRANSITIONS_CREATE, {
			values: $values,
			transition: $transition,
			storePath: $storePath,
			data: $wizard.data,
		});
	},
});


