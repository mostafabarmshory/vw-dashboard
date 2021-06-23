import templateUrl from './security-settings.html';

export default {
	access: 'hasAnyRole("tenant.owner")',
	templateUrl: templateUrl,
	groups: ['Tenant'],
	title: 'Security',
	icon: 'font_download',
//	controllerAs: 'ctrl',
	controller: function($scope, $tenant, $q) {
		'ngInject';
		$scope.options = ['nocaptcha', 'recaptcha'];

	    /**
	     * Gets information of a setting with given key. If there is no such setting
	     * item it creates a setting item with given key.
	     * 
	     * @param key
	     *            the key of setting item
	     */
		function _fetchSettingItem(key) {
			return $tenant.getSetting(key)
				.then(function(sett) {
					return sett;
				}, function(error) {
					if (error.status === 404) {
						return $tenant.putSetting({
							'key': key,
							'value': '',
							'mode': 0,
							'description': ''
						});
					} else {
						throw error;
					}
				})//
				.then(function(settingItem) {
					return settingItem;
				});
		}

	    /**
	     * Loads options of a captcha engine
	     * 
	     * @param engine
	     *            name of captcha engine
	     */
		function _loadCaptchaOptions(engine) {
			if (engine === 'recaptcha') {
				$scope.loadingCaptchaOptions = true;

				var p1 = _fetchSettingItem('captcha.engine.recaptcha.key')
					.then(function(res) {
						$scope.keySetting = res;
					});
				var p2 = _fetchSettingItem('captcha.engine.recaptcha.secret')
					.then(function(res) {
						$scope.secretKeySetting = res;
					});
				var p3 = _fetchSettingItem('captcha.engine.recaptcha.android.key')
					.then(function(res) {
						$scope.androidKeySetting = res;
					});
				var p4 = _fetchSettingItem('captcha.engine.recaptcha.android.secret')
					.then(function(res) {
						$scope.androidSecretKeySetting = res;
					});

				$q.all(p1, p2, p3, p4)//
					.finally(function() {
						$scope.loadingCaptchaOptions = false;
					});
			}
		}

		function loadCaptchaSetting() {
			$scope.loadingCaptchaSettings = true;
			_fetchSettingItem('captcha.engine')//
				.then(function(res) {
					$scope.captcha = res;
					_loadCaptchaOptions(res.value);
				}, function(error) {
					alert(error);
				})//
				.finally(function() {
					$scope.loadingCaptchaSettings = false;
				});
		}

		function loadHttpsSetting() {
			$scope.loadingHttpsSettings = true;
			var p1 = _fetchSettingItem('https.enable')//
				.then(function(res) {
					$scope.httpsEnable = res;
					$scope.enable = (res.value === 'true');
				});
			var p2 = _fetchSettingItem('https.redirect')//
				.then(function(res) {
					$scope.httpsRedirect = res;
					$scope.redirect = (res.value === 'true');
				});
			$q.all(p1, p2)
				.finally(function() {
					$scope.loadingHttpsSettings = false;
				});
		}

		function saveSetting() {
			$scope.savingSettings = true;
			var p1, p2, p3, p4, p5, p6, p7;

			p1 = $scope.captcha.update();
			if ($scope.captcha.value === 'recaptcha') {

				if ($scope.keySetting.value) {
					p2 = $scope.keySetting.update();
				}
				if ($scope.secretKeySetting.value) {
					$scope.secretKeySetting.mode = 0;
					p3 = $scope.secretKeySetting.update();
				}
				if ($scope.androidKeySetting.value) {
					p4 = $scope.androidKeySetting.update();
				}
				if ($scope.androidSecretKeySetting.value) {
					$scope.androidSecretKeySetting.mode = 0;
					p5 = $scope.androidSecretKeySetting.update();
				}
			}

			p6 = $scope.httpsEnable.update();
			p7 = $scope.httpsRedirect.update();

			$q.all(p1, p2, p3, p4, p5, p6, p7)//
				.finally(function() {
					$scope.savingSettings = false;
				});
		}

		function httpsEnableChanged(val) {
			$scope.httpsEnable.value = val;
		}

		function httpsRedirectChanged(val) {
			$scope.httpsRedirect.value = val;
		}

		$scope.$watch(function() {
			if (angular.isDefined($scope.captcha)) {
				return $scope.captcha.value;
			}
			return null;
		}, function(engine) {
			_loadCaptchaOptions(engine);
		});

		$scope.update = saveSetting;
		$scope.httpsEnableChanged = httpsEnableChanged;
		$scope.httpsRedirectChanged = httpsRedirectChanged;

		loadCaptchaSetting();
		loadHttpsSetting();
	},
}
