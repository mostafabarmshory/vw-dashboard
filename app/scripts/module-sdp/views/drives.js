
mblowfish.view(SDP_VIEW_DRIVES_PATH, {
	title: 'Storages',
	icon: 'storage',
	groups: ['Digital Assets'],
	templateUrl: 'scripts/module-sdp/views/drives.html',
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, $mbActions) {
		'ngInject';

		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.driveSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getDrives(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getDrive(id);
		};

		// delete account
		this.deleteModel = function(asset) {
			return $sdp.deleteDrive(asset.id);
		};

		/**
		Opne the content with an editor
		 */
		this.openEditor = function(link, $event) {
			$event.values = [link];
			return $mbActions.exec(SDP_DRIVES_EDIT_ACTION, $event);
		};

		this.init({
			eventType: SDP_DRIVES_SP,
		});
	},
});