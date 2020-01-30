


/**
 * @ngdoc controller
 * @name AmdContentNewCtrl
 * @description Mange content new
 */
angular.module('ngMaterialDashboardCms').controller('AmdContentNewCtrl', function($scope, $cms, $navigator, uuid4) {

	var ctrl = {
		savingContent: false
	};

	function cancel() {
		$navigator.openPage('/contents');
	}

	function add(config) {
		ctrl.savingContent = true;
		var data = config.model;
		if (typeof data.title === 'undefined') {
			data.title = data.name;
		}
		var promise = $cms.putContent(data);
		if (config.files[0]) {
			promise = promise.then(function(content) {
				var file = config.files[0].lfFile;
				return content.uploadValue(file);
			});
		}
		promise.then(function(obj) {
			$navigator.openPage('/content/' + obj.id);
		}, function(error) {
			alert('Fail to create content:' + error.data.message);
		})
			.finally(function() {
				ctrl.savingContent = false;
			});
	}


	/**
	 * Sets page name with random value
	 * 
	 * @memberof AmdContentNewCtrl
	 */
	this.generateRandomName = function() {
		$scope.config.model.name = uuid4.generate();
	};

	this.cancel = cancel;
	this.add = add;
	$scope.config = {};
	$scope.config.model = {
		name: uuid4.generate()
	};
});
