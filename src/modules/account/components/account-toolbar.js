
import templateUrl from './account-toolbar.html';
import './account-toolbar.css';

export default {
	templateUrl: templateUrl,
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
}