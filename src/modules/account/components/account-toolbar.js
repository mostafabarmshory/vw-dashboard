mblowfish.addComponent(AMD_ACCOUNT_TOOLBAR_COMPONENT, {
	templateUrl: 'scripts/module-account/components/account-toolbar.html',
	controllerAs: 'ctrl',
	controller: function($mbActions) {
		'ngInject';

		this.logout = function($event) {
			$mbActions.exec(AMD_ACCOUNT_LOGOUT_ACTION, $event);
		};

		this.openProfile = function($event) {
			$mbActions.exec(AMD_ACCOUNT_PROFILE_UPDATE_ACTION, $event);
		};
	}
});