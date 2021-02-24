
mblowfish.editor('/sdp/categories/:modelId', {
	templateUrl: 'scripts/module-sdp/editors/category.html',
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
			.getCategory($state.params.modelId)
			.then(function(model) {
				ctrl
					.setTitle('Category:' + $state.params.modelId)
					.setModel(model)
					.setStorePath(SDP_CATEGORIES_SP);
			}, function() {
				// TODO: asset not found
			});
	},
});