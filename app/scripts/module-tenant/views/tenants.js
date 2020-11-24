
mblowfish.view(TENANT_TENANTS_VIEW_PATH, {
	templateUrl: 'scripts/module-tenant/views/tenants.html',
	controllerAs: 'ctrl',
	groups: ['Tenant'],
	title: 'Tenants',
	icon: 'business',
	controller: function($scope, $controller, $tenant, $view, $mbActions) {
		'ngInject';
		// Extends with ItemsController
		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
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
		
		this.editTenant = function(tenant, $event){
			$event.values = [tenant];
			return $mbActions.exec(TENANT_TENANTS_EDIT_ACTION, $event);
		};

		// initial the controller
		this.init({
			eventType: TENANT_TENANTS_SP,
		});
	}
});