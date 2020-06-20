
mblowfish.addAction('account.chat',{
	title: 'Chat',
	icon: 'chat',
	/* @ngAction */
	action: function(){
		$crisp.push(['do', 'chat:open']);
	}
})