
mblowfish.addAction(AMD_ACCOUNT_CHAT_ACTION, {
	title: 'Chat',
	icon: 'chat',
	action: function() {
		'ngInject';
		$crisp.push(['do', 'chat:open']);
	}
});