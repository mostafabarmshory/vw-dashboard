
mblowfish.addAction(AMD_ACCOUNT_LOGOUT_ACTION, {
	title: 'Logout',
	icon: 'exit',
	action: function() {
		toggleRightSidebar();
		logout();
	}
});