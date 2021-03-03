
export default function($mbToolbar) {
	'ngInject';

		$mbToolbar
			.getToolbar('/ums/accounts')
			.addAction(AMD_USER_ACCOUNT_CREATE_ACTION);


	//		// Add action
	// View: '/ums/groups'
	//		this.addAction({
	//			title: 'New group',
	//			icon: 'add',
	//			action: function() {
	//				$navigator.openPage('ums/groups/new');
	//			}
	//		});


	//		// Add action
	// View: '/ums/roles'
	//		this.addAction({
	//			title: 'New group',
	//			icon: 'add',
	//			action: function() {
	//				$navigator.openPage('ums/groups/new');
	//			}
	//		});

}