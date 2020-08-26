
mblowfish.addAction(AMD_ACCOUNT_MESSAGES_ACTION, {
	title: 'Messages',
	icon: 'notifications',
	action: function($mbSidenav) {
		'ngInject';
		$mbSidenav.getSidenav(AMD_ACCOUNT_MESSAGES_SIDENAV).toggle();
	}
});