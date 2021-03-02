import templateUrl from './drive.html';
/**



 */
export default {
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($scope, $element, $controller, $sdp, $editor, $state, SdpDrive) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractItemEditorCtrl', {
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
				.setTitle('Drive' + ':' + $state.params.modelId)
				.setDerty(false);
			return ctrl.setModel(new SdpDrive(data));
		}

		$sdp
			.getDrive($state.params.modelId)
			.then(setDriveData, function() {
				ctrl.setObjectNotFoundError();
			});
	}
}
