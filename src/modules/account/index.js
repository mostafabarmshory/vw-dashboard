import mblowfish from 'mblowfish';

// >> actions
import changePasswordAction from './actions/change-password';
import chatAction from './actions/crisp-chat';
import logoutAction from './actions/logout';
import messageAction from './actions/messages';
import profileUpdateAction from './actions/profile-update';
// Components
import accountToolbarCompoent from './components/account-toolbar'
import accountMessageCompornt from './components/messages'
// >> directives
import mbUserMenuDirective from './directives/mbUserMenu';
// >> editors
// >> filters
// >> factories
import MbUserAtuthenticationProviderFactory from './factories/MbUserAtuthenticationProvider';
import messageSidenav from './sidenavs/messages';
// >> services
// >> views
import profileView from './views/profile';

import Constants from './Constants';

mblowfish
	.addConstants(Constants)


	// >> actions
	.action(Constants.AMD_ACCOUNT_CHANGE_PASSWORD_ACTION, changePasswordAction)
	.action(Constants.AMD_ACCOUNT_CHAT_ACTION, chatAction)
	.action(Constants.AMD_ACCOUNT_LOGOUT_ACTION, logoutAction)
	.action(Constants.AMD_ACCOUNT_MESSAGES_ACTION, messageAction)
	.action(Constants.AMD_ACCOUNT_PROFILE_UPDATE_ACTION, profileUpdateAction)
	// >> actions
	.component(Constants.AMD_ACCOUNT_TOOLBAR_COMPONENT, accountToolbarCompoent)
	.component(Constants.AMD_ACCOUNT_MESSAGES_COMPONENT, accountMessageCompornt)
	// >> directives
	.directive('mbUserMenu', mbUserMenuDirective)
	// >> editors
	// >> filters
	// >> factories
	.factory('MbUserAtuthenticationProvider', MbUserAtuthenticationProviderFactory)
	// >> Sidenav
	.sidenav(Constants.AMD_ACCOUNT_MESSAGES_SIDENAV, messageSidenav)
	// >> services
	// >> views
	.view(Constants.AMD_ACCOUNT_PROFILES_VIEW, profileView)


	;