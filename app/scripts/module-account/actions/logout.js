
mblowfish.addAction(AMD_ACCOUNT_LOGOUT_ACTION, {
	title: 'Logout',
	icon: 'exit',
	action: function($mbAccount) {
		'ngInject';
		$mbAccount.logout();
	}
});