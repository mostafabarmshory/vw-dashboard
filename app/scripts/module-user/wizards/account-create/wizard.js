mblowfish.wizard(AMD_USER_ACCOUNT_CREATE_WIZARD, {
	title: 'Create an Account',
	description: 'A new account will be created with group, roles and avatar.',
	pages: [
		AMD_USER_ACCOUNT_CREATE_WIZARD + '#account',
		AMD_USER_ACCOUNT_CREATE_WIZARD + '#cridential',
		AMD_USER_ACCOUNT_CREATE_WIZARD + '#avatar',
		AMD_USER_ACCOUNT_CREATE_WIZARD + '#profile',
		AMD_USER_ACCOUNT_CREATE_WIZARD + '#roles',
		AMD_USER_ACCOUNT_CREATE_WIZARD + '#groups',
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

});