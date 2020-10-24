
mblowfish.addView(SDP_VIEW_CATEGORIES_PATH, {
	templateUrl: 'scripts/module-sdp/views/categories.html',
	title: 'Categories',
	icon: 'folder',
	groups: ['Digital Assets'],
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, $mbActions) {
		'ngInject';

		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.categorySchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getCategories(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getCategory(id);
		};

		// delete account
		this.deleteModel = function(asset) {
			return $sdp.deleteCategory(asset.id);
		};

		/**
		Opne the content with an editor
		 */
		this.openEditor = function(asset, $event) {
			$event.values = [asset];
			return $mbActions.exec(SDP_CATEGORIES_EDIT_ACTION, $event);
		};

		this.init({
			eventType: SDP_CATEGORIES_SP,
		});
	},
});