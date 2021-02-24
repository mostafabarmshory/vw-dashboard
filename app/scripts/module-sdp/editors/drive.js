
/**



 */
mblowfish.editor('/sdp/storages/:modelId', {
	templateUrl: 'scripts/module-sdp/editors/drive.html',
	controllerAs: 'ctrl',
	controller: function($scope, $element, $controller, $sdp, $editor, $state, SdpDrive, $mbTranslate) {
		'ngInject';

		angular.extend(this, $controller('SeenAbstractItemEditorCtrl', {
			$scope: $scope,
			$element: $element,
			$editor: $editor
		}));

		/*
		Loading asset and initialize editor
		 */
		var ctrl = this;

		function setDriveData(data) {
			ctrl.setStorePath(SDP_DRIVES_SP)
				.setTitle($mbTranslate('Drive') + ':' + $state.params.modelId)
				.setDerty(false);
			return ctrl.setModel(new SdpDrive(data));
		}

		$sdp
			.getDrive($state.params.modelId)
			.then(setDriveData, function() {
				ctrl.setObjectNotFoundError();
			});
	}
});
