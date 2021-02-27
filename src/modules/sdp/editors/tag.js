
mblowfish.editor('/sdp/tags/:modelId', {
	templateUrl: 'scripts/module-sdp/editors/tag.html',
	controllerAs: 'ctrl',
	controller: function($scope, $editor, $element, $controller, $sdp, $mbTranslate, $state) {
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
		$sdp
			.getTag($state.params.modelId)
			.then(function(tag) {
				ctrl
					.setTitle('Tag:' + $state.params.modelId)
					.setModel(tag)
					.setStorePath(SDP_TAGS_SP);
			}, function() {
				// TODO: asset not found
			});
	},
});