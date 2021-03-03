

import templateUrl from './local-settings.html';

export default {
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	groups: ['Tenant'],
	title: 'Local settings',
	icon: 'settings_applications',
	controller: function($scope, $tenant, $q, $http) {
		'ngInject';
		var ctrl = {
			loadingSettings: false,
			savingSettings: false
		};

		var settingKeys = [
			'local.language',
			'local.date',
			'local.currency'
		];

		$scope.settings = {};
		$scope.languages = { 'fa': 'Persian', 'en': 'English' };
		$scope.dates = { 'jalali': 'Jalali', 'gergorian': 'Gergorian' };

		ctrl.currencies = {};

		function loadCurrencies() {
			$http({
				method: 'GET',
				url: 'https://openexchangerates.org/api/currencies.json'
			}).then(function(response) {
				var currencies = response.data;
				// Add Toman to the list
				var newCurrency = Object.assign({ IRT: 'Iranian Toman' }, currencies);
				//sort based on keys
				Object.keys(newCurrency).sort().forEach(function(key) {
					ctrl.currencies[key] = newCurrency[key];
				});
			});
		}

		function fetchSetting(key) {
			return $tenant.getSetting(key)
				.then(function(sett) {
					return sett;
				}, function(error) {
					if (error.status === 404) {
						return $tenant.putSetting({
							'key': key,
							'value': ''
						});
					} else {
						throw error;
					}
				})//
				.then(function(settingItem) {
					$scope.settings[key] = settingItem;
				});
		}

		function save() {
			ctrl.savingSettings = true;
			var promiseList = [];
			for (var i = 0; i < settingKeys.length; i++) {
				var key = settingKeys[i];
				if (angular.isDefined($scope.settings[key]) && angular.isFunction($scope.settings[key].update)) {
					promiseList.push($scope.settings[key].update());
				} else if (angular.isDefined($scope.settings[key].value)) {
					promiseList.push($tenant.putSettings({ 'key': key, 'value': $scope.settings[key].value }));
				}
			}
			$q.all(promiseList)//
				.finally(function() {
					ctrl.savingSettings = false;
					toast('Settings saved successfully');
				});
		}

		function loadSettings() {
			ctrl.loadingSettings = true;
			var promiseList = [];
			for (var i = 0; i < settingKeys.length; i++) {
				var key = settingKeys[i];
				promiseList.push(fetchSetting(key));
			}
			$q.all(promiseList)//
				.finally(function() {
					ctrl.loadingSettings = false;
				});
		}

		$scope.ctrl = ctrl;
		$scope.save = save;

		loadSettings();
		loadCurrencies();
	},
}