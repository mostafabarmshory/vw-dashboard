import templateUrl from './sitemap-link.html';

export default {
	templateUrl: templateUrl,
	controller: function($scope, $controller, $seo) {
		'ngInject';
		/*
		 * Extends collection controller from MbAbstractCtrl 
		 */
		angular.extend(this, $controller('MbSeenAbstractItemCtrl', {
			$scope: $scope
		}));

		// -------------------------------------------------------------------------
		// Model
		//
		// We suppose that all model action be override by the new controllers.
		//
		// -------------------------------------------------------------------------
		this.deleteModel = function(item) {
			return $seo.deleteLink(item.id);
		};

		this.getModelSchema = function() {
			return $seo.linkSchema();
		};

		this.getModel = function(id) {
			return $seo.getLink(id);
		};

		this.updateModel = function(model) {
			return model.update();
		};

		// Loads the controller
		this.init({
			eventType: '/seo/links',
			confirmation: true,
			//		dataQuery: '{id, name, title}', 
			//		modelId: $routeParam.modelId,
		});

	},
	controllerAs: 'ctrl',
}


