
mblowfish.editor('/sdp/assets/:modelId', {
	templateUrl: 'scripts/module-sdp/editors/asset.html',
	controllerAs: 'ctrl',
	controller: function($scope, $element, $controller, $sdp, $editor, $state, SdpAsset) {
		'ngInject';
		// XXX: add fields path,
		var graphQl = '{' +
			'id,title,size,file_name,download,creation_dtime,modif_dtime,description,mime_type,media_type,price,cover,state,parent_id,owner_id,drive_id,' +
			'categories{id, name},' +
			'tags{id, name},' +
			'}';

		angular.extend(this, $controller('SeenAbstractItemEditorCtrl', {
			$scope: $scope,
			$element: $element,
			$editor: $editor
		}));



		/*
		Loading asset and initialize editor
		 */
		var ctrl = this;
		function setAssetData(data) {
			return new SdpAsset(data);
		}

		function setCategoriesData(dataList) {
			ctrl.categories = dataList;
		}
		function setTagsData(dataList) {
			ctrl.tags = dataList;
		}
		//		$editor.setTitle($mbTranslate('Asset') + ':' + modelId);
		$sdp
			.getAsset($state.params.modelId, {
				graphql: graphQl
			})
			.then(function(assetData) {
				setCategoriesData(assetData.categoires);
				setTagsData(assetData.tags);
				delete assetData.categories;
				delete assetData.tags;
				ctrl.setModel(setAssetData(assetData))
					.setStorePath(SDP_ASSETS_SP);
			}, function() {
				// TODO: asset not found
			})
	}
});
