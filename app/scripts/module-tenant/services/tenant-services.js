
mblowfish.provider('$mbTenant', function() {

	//---------------------------------------
	// Services
	//---------------------------------------
	var provider;
	var service;
//	var rootScope;


//	//---------------------------------------
//	// variables
//	//---------------------------------------
//	//	var TENANT_GRAPHQL = '{id,title,description,' +
//	//		'account' + USER_DETAIL_GRAPHQL +
//	//		'configurations{key,value}' +
//	//		'settings{key,value}' +
//	//		'}';
//
//
//	//---------------------------------------
//	// functions
//	//---------------------------------------
//	/*
//	 * Stores app configuration on the back end
//	 */
//	function storeApplicationConfig() {
//		if (!$rootScope.__account.permissions.tenant_owner) {
//			return;
//		}
//		if (appConfigurationContent) { // content loaded
//			return appConfigurationContent.uploadValue($rootScope.__app.configs);
//		}
//		// create content
//		promise = $cms.putContent({
//			name: $rootScope.__app.configs_key,
//			mimetype: APP_CNF_MIMETYPE
//		})
//			.then(function(content) {
//				appConfigurationContent = content;
//				return appConfigurationContent.uploadValue($rootScope.__app.configs);
//			});
//	};
//
//	/*
//	 * Check a module to see if it is enable or not
//	 */
//	// TODO: Masood, 2019: Improve the function to check based on tenant setting
//	function isEnable(moduleName) {
//		return $rootScope.__tenant.domains[moduleName];
//	}
//
//
//	function parsTenantConfiguration(configs) {
//		$rootScope.__tenant.configs = keyValueToMap(configs);
//		var $event = {
//			src: this,
//			type: 'update',
//			value: $rootScope.__tenant.configs
//		};
//		$dispatcher.dispatch('/tenant/configs', $event);
//
//		// load domains
//		var domains = {};
//		var regex = new RegExp('^module\.(.*)\.enable$', 'i');
//		for (var i = 0; i < configs.length; i++) {
//			var config = configs[i];
//			var match = regex.exec(config.key);
//			if (match) {
//				var key = match[1].toLowerCase();
//				domains[key] = parseBooleanValue(config.value);
//			}
//		}
//		$rootScope.__tenant.domains = domains;
//		// Flux: fire account change
//		var $event = {
//			src: this,
//			type: 'update',
//			value: $rootScope.__tenant.domains
//		};
//		$dispatcher.dispatch('/tenant/domains', $event);
//	}
//
//	function parsTenantSettings(settings) {
//		$rootScope.__tenant.settings = keyValueToMap(settings);
//		$rootScope.__app.options = $rootScope.__tenant.settings;
//
//		// Flux: fire setting change
//		var $event = {
//			src: this,
//			type: 'update',
//			value: $rootScope.__account
//		};
//		$dispatcher.dispatch('/tenant/settings', $event);
//	}

	function reload() {
		return true;
	}


	//---------------------------------------
	// End
	//---------------------------------------
	service = {
		reload: reload
	};
	provider = {
		$get: function() {
			return service;
		}
	};
	return provider;
});