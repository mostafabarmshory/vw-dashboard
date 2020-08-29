
mblowfish.view('/tenant/tenants', {
	templateUrl: 'scripts/module-tenant/views/tenants.html',
	controllerAs: 'ctrl',
	groups: ['Tenant'],
	title: 'Tenants',
	icon: 'business',
	controller: function($scope, $controller, $tenant, $mbActions) {
		'ngInject';
		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

		/**
		 * Gets schema of the tenant model
		 */
		this.getModelSchema = function() {
			return $tenant.tenantSchema();
		};

		// get tenants
		this.getModels = function(parameterQuery) {
			return $tenant.getTenants(parameterQuery);
		};

		// get a tenant
		this.getModel = function(id) {
			return $tenant.getTenant(id);
		};

		// delete tenant
		this.deleteModel = function(item) {
			return item.delete();
		};

		// initial the controller
		this.init({
			eventType: '/tenant/tenants'
		});

		// add actions
		this.addActions([{
			title: 'New tenant',
			icon: 'add',
			action: function() {
				$mbActions.exec('create:/tenant/tenants');
			}
		}]);
	}
});