
mblowfish.addAction(AMD_ACCOUNT_CHAT_ACTION, {
	group: 'Support',
	title: 'Live Chat',
	description: 'Live chat with support team',
	icon: 'chat',
	action: function() {
		'ngInject';
		$crisp.push(['do', 'chat:open']);
	}
});