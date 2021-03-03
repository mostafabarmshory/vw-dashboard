/**
Opens an edtior to edit an account

List of acounts must be passed as values to the action.

 */


export default {
	icon: 'new',
	title: 'Edit an Account',
	description: 'Open an editor to edit an account or list of accounts',
	group: 'User',
	action: function($event, $mbLocation) {
		'ngInject';
		if (!$event.values) {
			return;
		}
		_.forEach($event.values, function(account) {
			// maso, 2020: open editor for the account
			var link = 'ums/accounts/' + account.id;
			return $mbLocation.url(link);
		});
	}
}

