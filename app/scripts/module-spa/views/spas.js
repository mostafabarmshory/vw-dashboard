
mblowfish.view(TENANT_SPAS_VIEW, {
	templateUrl: 'scripts/module-spa/views/spas.html',
	title: 'spas',
	icon: 'apps',
	groups: ['Applications'],
	controllerAs: 'ctrl',
	controller: function($scope, $tenant, $view, $controller) {
		'ngInject';

		// Extends with ItemsController
		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
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
});