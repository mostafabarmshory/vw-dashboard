
mblowfish.view('/sdp/assets', {
	title: 'Assets',
	icon: 'web_asset',
	groups: ['Digital Assets'],
	templateUrl: 'scripts/module-sdp/views/assets.html',
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, $mbActions, $mbLog, MbAction) {
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

		//		// delete account
		//		this.deleteModel = function(asset) {
		//			return $sdp.deleteAsset(asset.id);
		//		};

		/**
		Opne the content with an editor
		 */
		this.openEditor = function(asset, $event) {
			$event.values = [asset];
			return $mbActions.exec(SDP_ASSETS_EDIT_ACTION, $event);
		};

		this.showDetail = function(asset, $event) {
			$event.values = [asset];
			return $mbActions.exec(SDP_ASSETS_DETAILS_ACTION, $event);
		};

		this.init({
			eventType: SDP_ASSETS_SP,
		});

		var ctrl = this;

		$view.getToolbar()
			.addAction(new MbAction({
				title: 'Delete',
				icon: 'delete',
				hide: function() {
					return !ctrl.hasSelected();
				},
				action: function() {
					confirm('Delete Selected Items?')
						.then(function() {
							$event.values = ctrl.getSelection();
							return $mbActions.exec(SDP_ASSETS_DELETE_ACTION, $event);
						});
				}
			}))
			.addAction(new MbAction({
				title: 'Edit',
				icon: 'edit',
				hide: function() {
					return !ctrl.hasSelected();
				},
				action: function($event) {
					$event.values = ctrl.getSelection();
					return $mbActions.exec(SDP_ASSETS_EDIT_ACTION, $event);
				}
			}))
			.addAction(new MbAction({
				title: 'Preview',
				icon: 'preview',
				hide: function() {
					return ctrl.getSelectionSize() !== 1;
				},
				action: function($event) {
					$event.values = ctrl.getSelection();
					return $mbActions.exec(SDP_ASSETS_DETAILS_ACTION, $event);
				}
			}));
	},
});