
mblowfish.addView('/tenant/tenants', {
	templateUrl: 'scripts/module-tenant/views/tenants.html',
	controller: function($scope, $controller, $tenant, $mbActions) {

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
	},
	controllerAs: 'ctrl',
	groups: ['Tenant'],
	title: 'Tenants',
	icon: 'business'
});