import Constatns from '../../Constants';

export default {
	title: 'Create a Group',
	description: 'Group is used to manage access controll of several accounts at the same time.',
	pages: [
		Constatns.AMD_USER_GROUP_CREATE_WIZARD + '#group',
	],

	/*
	Validate data on changes
	*/
	onChange: function($wizard) {
		'ngInject';
		var data = $wizard.data;
		var message;
		if (data.name) {
			message = 'Group name is required';
		}
		$wizard.setErrorMessage(message);
	},
	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		var data = $wizard.data;
		return data.name;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		return $mbActions.exec(AMD_USER_GROUP_CREATE_ACTION, {
			values: [$wizard.data]
		});
	},

}



