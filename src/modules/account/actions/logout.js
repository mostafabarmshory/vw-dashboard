
export default {
	group: 'Account',
	title: 'Logout',
	description: 'Logout from dashboard',
	icon: 'logout',
	action: function($mbAccount) {
		'ngInject';
		$mbAccount.logout();
	}
}