
import templateUrl from './backends.html';

export default {
	title: 'Prerender backends',
	templateUrl: templateUrl,
	groups: ['seo'],
	icon: 'dvr',
	controllerAs: 'ctrl',
	controller: function($scope, $view, $seo, $controller) {
		'ngInject';
		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Overried the function
		this.getModelSchema = function() {
			return $seo.backendSchema();
		};

		// get groups
		this.getModels = function(parameterQuery) {
			return $seo.getBackends(parameterQuery);
		};

		// get a group
		this.getModel = function(id) {
			return $seo.getBackend(id);
		};

		// Add group
		this.addModel = function(model) {
			return $seo.putBackend(model);
		};

		this.init({
			eventType: '/seo/backends'
		});

	},
}