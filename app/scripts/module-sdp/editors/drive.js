
/**



 */
mblowfish.editor('/sdp/storages/:modelId', {
	templateUrl: 'scripts/module-sdp/editors/drive.html',
	controllerAs: 'ctrl',
	controller: function($scope, $element, $controller, $sdp, $editor, $state, SdpDrive, $mbTranslate) {
		'ngInject';
		// XXX: add fields path,
		//		var graphQl = '{' +
		//			'id,title,size,file_name,download,creation_dtime,modif_dtime,description,mime_type,media_type,price,cover,state,parent_id,owner_id,drive_id,' +
		//			'categories{id, name},' +
		//			'tags{id, name},' +
		//			'}';

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
				.setTitle('Drive' + ':' + $state.params.modelId)
				.setDerty(false);
			return ctrl.setModel(new SdpDrive(data));
		}

		$sdp
			.getDrive($state.params.modelId, {
				// graphql: graphQl
			})
			.then(setDriveData, function() {
				ctrl.setObjectNotFoundError();
			});
	}
});
