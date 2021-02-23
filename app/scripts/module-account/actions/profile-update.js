/**
Update list of profiles

If there is no profile, then the profile view will be open.


NOTE: do not use the action into the view directly.
 */

mblowfish.addAction(AMD_ACCOUNT_PROFILE_UPDATE_ACTION, {
	demon: true,
	group: 'Account',
	action: function($mbView) {
		
		// open the profiles view
		return $mbView.open(AMD_ACCOUNT_PROFILES_VIEW, {}, 'editors');
	}
});