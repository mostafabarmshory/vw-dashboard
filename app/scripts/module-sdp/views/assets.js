
mblowfish.view('/sdp/assets', {
	title: 'Assets',
	icon: 'web_asset',
	groups: ['Digital Assets'],
	templateUrl: 'scripts/module-sdp/views/assets.html',
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, $mbActions) {
		'ngInject';

		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.assetSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getAssets(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getAsset(id);
		};

		// delete account
		this.deleteModel = function(asset) {
			return $sdp.deleteAsset(asset.id);
		};

		/**
		Opne the content with an editor
		 */
		this.openEditor = function(asset, $event) {
			$event.values = [asset];
			return $mbActions.exec(SDP_ASSET_EDIT_ACTION, $event);
		};

		this.init({
			eventType: SDP_ASSETS_SP,
		});
	},
});