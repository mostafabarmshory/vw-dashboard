/**

@ngInject
 */
import MbAccountLoginComponent from './modules/account/components/MbAccountLoginComponent';

export default function(
	$mbApplicationProvider, $mbLayoutProvider, $mbToolbarProvider, $mbActionsProvider,
	//		$mbSidenavProvider,
	$mbAccountProvider,
	$mbTranslateSanitizationProvider, $mbTranslateProvider,
	$mbStorageProvider, $locationProvider) {


	//
	// $mbAction: manages all actions
	//
	$mbActionsProvider
		.setShortkeysEnabled(true);

	$mbAccountProvider
		.addAuthenticationProvider('MbUserAtuthenticationProvider');

	// Translation 
	$mbTranslateProvider
		.useMissingTranslationHandlerLog()
		//.useMissingTranslationHandler('$mbTranslateMissingTranslationHandlerStorage')
		.useStaticFilesLoader({
			files: [{
				prefix: '/api/v2/cms/contents/local-language-',
				suffix: '/content'
			}]
		})
		.fallbackLanguage(['en', 'fa'])
		.preferredLanguage('en');
	$mbTranslateSanitizationProvider
		.useStrategy(['sanitizeParameters']);

	//
	// Application ID
	//
	// Application ID is used to seperate applications from each other. for
	// example you may have studo and dashboard application.
	//
	$mbApplicationProvider
		.setKey(APP_KEY)
		.setPreloadingEnabled(true)
		.setAccountDetailRequired(true)
		.setSettingsRequired(true)
		.setLogingRequired(true)
		.setLoginComponent(MbAccountLoginComponent);

	//
	// Application storage prefix
	//
	//  All data will be stored in local storage with key. This will be
	// added to all keys. So you can run several application which is 
	// designed based on MB
	$mbStorageProvider.setKeyPrefix(APP_KEY + '.');

	//
	// HTML5 Addess style
	//
	// Enables HTML5 addresss style. SO the #! sign will be removed from
	// the path.
	$locationProvider.html5Mode(true);

	//
	//  $mbLayout: manages layouts of the system. It is used as a basic layout
	// system to manage views, editors and etc. You are free to add layouts dynamically
	// at runtime.
	//
	$mbLayoutProvider
		.addProvider('MbLayoutsLayoutProviderLocal')
		.addProvider('VwLayoutProviderDefault')
		.setDefalutLayout('default');

	//
	//  By initializing the main toolbar you can add list of action or component
	// into the toolbar.
	//
	$mbToolbarProvider.init([{
		url: '/dashboard',
		items: [
			MB_NAVIGATOR_SIDENAV_TOGGLE_ACTION,
			MB_NAVIGATOR_CMDLINE_TOGGLE_ACTION
		]
	}, {
		url: '/cms',
		items: []
	}, {
		url: '/user/account',
		float: 'right',
		items: [
			MB_LAYOUTS_THEME_SWITECH_ACTION,
			AMD_ACCOUNT_MESSAGES_COMPONENT,
			AMD_ACCOUNT_TOOLBAR_COMPONENT,
		]
	}, {
		url: '/user/notifications',
		float: 'right',
		items: [
			AMD_ACCOUNT_CHAT_ACTION,
			MB_LAYOUTS_TOOLBAR_COMPONENT,
		]
	}]);
}