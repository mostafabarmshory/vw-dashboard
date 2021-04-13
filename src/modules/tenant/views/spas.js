
import templateUrl from './spas.html';

export default {
	access: 'hasAnyRole("tenant.owner")',
	templateUrl: templateUrl,
	title: 'spas',
	icon: 'apps',
	groups: ['Tenant'],
//	controllerAs: 'ctrl',
	controller: function($scope, $tenant, $view, $controller) {
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
			return $tenant.spaSchema();
		};

		// get spas
		this.getModels = function(parameterQuery) {
			return $tenant.getSpas(parameterQuery);
		};

		// get a spa
		this.getModel = function(id) {
			return $tenant.getSpa(id);
		};

		this.init({
			eventType: TENANT_SPAS_SP
		});

	},
}