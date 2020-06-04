
/**
 * @ngdoc controller
 * @name AmdSeoBackendCtrl
 * @description
 *  # AmdSeoBackendCtrl Controller of the ngMaterialDashboardSeo
 */
mblowfish.controller('AmdSeoBackendNewCtrl', function ($scope, $seo, $navigator) {
	var ctrl ={
			status: 'relax'
	};

	function loadEngines()
	{
		return $seo.getEngines()//
		.then(function(engines){
			$scope.engines = engines;
		});
	}

	function loadBackendProperties(engine){
	    $scope.selectedEngine = engine;
		return $seo.getEngine(engine.id)//
		.then(function(properties){
			$scope.properties = properties.children;
		});
	}

	function newBackend(engine, data){
		ctrl.status = 'working';
		data.type = engine.type;
		return $seo.putBackend(data)//
		.then(function(backend){
			$navigator.openPage('seo/backends/'+backend.id);
		}, function(){
			alert('Failed to create backend');
		})//
		.finally(function(){
			ctrl.status = 'relax';
		});
	}

	$scope.$watch('_engine', function(newValue){
		if(newValue){
			return loadBackendProperties(newValue);
		}
	});

	$scope.ctrl = ctrl;
	$scope.loadEngines = loadEngines;
	$scope.newBackend = newBackend;
	$scope._userValus = {};
});
