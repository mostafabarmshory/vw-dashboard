
mblowfish.addAction(AMD_ACCOUNT_CHAT_ACTION,{
	title: 'Chat',
	icon: 'chat',
	/* @ngAction */
	action: function(){
		$crisp.push(['do', 'chat:open']);
	}
});