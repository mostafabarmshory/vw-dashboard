mblowfish.view('/seo/backends-new', {
	title: 'New prerender backend',
	groups: ['seo'],
	icon: 'add',
	templateUrl: 'scripts/module-seo/views/backends-new.html',
	controllerAs: 'ctrl',
	controller: function($scope, $seo, $navigator) {
		var ctrl = {
			status: 'relax'
		};

		function loadEngines() {
			return $seo.getEngines()//
				.then(function(engines) {
					$scope.engines = engines;
				});
		}

		function loadBackendProperties(engine) {
			$scope.selectedEngine = engine;
			return $seo.getEngine(engine.id)//
				.then(function(properties) {
					$scope.properties = properties.children;
				});
		}

		function newBackend(engine, data) {
			ctrl.status = 'working';
			data.type = engine.type;
			return $seo.putBackend(data)//
				.then(function(backend) {
					$navigator.openPage('seo/backends/' + backend.id);
				}, function() {
					alert('Failed to create backend');
				})//
				.finally(function() {
					ctrl.status = 'relax';
				});
		}

		$scope.$watch('_engine', function(newValue) {
			if (newValue) {
				return loadBackendProperties(newValue);
			}
		});

		$scope.ctrl = ctrl;
		$scope.loadEngines = loadEngines;
		$scope.newBackend = newBackend;
		$scope._userValus = {};
	},
});