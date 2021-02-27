
mblowfish.addAction(AMD_ACCOUNT_LOGOUT_ACTION, {
	group: 'Account',
	title: 'Logout',
	description: 'Logout from dashboard',
	icon: 'logout',
	action: function($mbAccount) {
		'ngInject';
		$mbAccount.logout();
	}
});