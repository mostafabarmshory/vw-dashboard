
import Constants from '../../Constants';

export default {
	title: 'New Transition',
	description: 'Performs a transition on a model.',
	pages: [
		Constants.SEEN_MODEL_TRANSITION_DATA_WIZARD + '#properties',
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
		return $mbActions.exec(Constants.SEEN_MODEL_TRANSITIONS_CREATE, {
			values: $values,
			transition: $transition,
			storePath: $storePath,
			data: $wizard.data,
		});
	},
}



