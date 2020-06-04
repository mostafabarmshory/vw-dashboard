
	/**
	 * @ngdoc controller
	 * @name AmdContentNewCtrl
	 * @description Mange content new
	 */
	mblowfish.controller('SdpCategoryNewCtrl', function($scope, $sdp, $navigator, $mbResource) {

		var ctrl = {
			saving: false
		};

		function cancel() {
			$navigator.openPage('sdp/categories');
		}

		function add(config) {
			ctrl.saving = true;
			var data = config.model;
			data.parent_id = ctrl.parent_id;
			$sdp.putCategory(data)//
				.then(function(obj) {
					ctrl.saving = false;
					$navigator.openPage('sdp/category/' + obj.id);
				}, function() {
					ctrl.saving = false;
					alert('Fail to create category.');
				});
		}

		function selectParent() {
			return $mbResource
				.get('sdp-category', {
					data: ctrl.parent
				})//
				.then(function(parent) {
					ctrl.parent = parent;
					ctrl.parent_id = parent.id;
				});
		}

		$scope.cancel = cancel;
		$scope.add = add;
		$scope.selectParent = selectParent;
		$scope.ctrl = ctrl;
	});
