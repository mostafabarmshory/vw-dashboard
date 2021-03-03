import Constatns from '../../Constants';

export default {
	title: 'Create an Account',
	description: 'A new account will be created with group, roles and avatar.',
	pages: [
		Constatns.AMD_USER_ACCOUNT_CREATE_WIZARD + '#account',
		Constatns.AMD_USER_ACCOUNT_CREATE_WIZARD + '#cridential',
		Constatns.AMD_USER_ACCOUNT_CREATE_WIZARD + '#avatar',
		Constatns.AMD_USER_ACCOUNT_CREATE_WIZARD + '#profile',
		Constatns.AMD_USER_ACCOUNT_CREATE_WIZARD + '#roles',
		Constatns.AMD_USER_ACCOUNT_CREATE_WIZARD + '#groups',
	],

	/*
	Validate data on changes
	*/
	onChange: function($wizard) {
		'ngInject';
		var data = $wizard.data;
		var message;
		if (data.password && data.password !== data.confirm_password) {
			message = 'Passwords do not match';
		}
		$wizard.setErrorMessage(message);
	},
	/*
	Check if it is possible to finish
	*/
	canFinish: function() {
		'ngInject';
		// XXX
		return true;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		return $mbActions.exec(AMD_USER_ACCOUNT_CREATE_ACTION, {
			values: [$wizard.data]
		});
	},

}



