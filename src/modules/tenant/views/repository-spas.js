import templateUrl from './repository-spas.html';

export default {
	controllerAs: 'ctrl',
	templateUrl: templateUrl,
	title: 'Repository',
	icon: 'cloud_upload',
	groups: ['Tenant'],
	controller: function($scope, $controller, $tenant, $view) {
		'ngInject';

		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view
		}));

		/*
		 * Overried the function
		 */
		this.getModelSchema = function() {
			return $tenant.repositorySpaSchema();
		};

		// get spas
		this.getModels = function(parameterQuery) {
			return $tenant.getRepositorySpas(parameterQuery);
		};

		// get a spa
		this.getModel = function(id) {
			return $tenant.getRepositorySpa(id);
		};

		this.init({
			eventType: '/spas/repository'
		});
	},
}
