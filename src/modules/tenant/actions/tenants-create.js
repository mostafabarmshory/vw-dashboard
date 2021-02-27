export default {
	priority: 10,
	icon: 'store',
	group: 'Tenant',
	title: 'New Tenant',
	description: 'Creates new sub-tenant in the current one',
	action: function($tenant, $navigator, $mbDispatcher, $window, $mbTranslate) {
		'ngInject';
		var job = $tenant.tenantSchema()
			.then(function(schema) {
				return $navigator.openDialog({
					templateUrl: 'views/dialogs/amd-item-new.html',
					config: {
						title: 'New Tenant',
						schema: schema,
						data: {}
					}
				});
			})
			.then(function(itemData) {
				return $tenant.putTenant(itemData);
			})
			.then(function(item) {
				$mbDispatcher.dispatch('/tenant/tenants', {
					key: 'create',
					values: [item]
				});
			}, function() {
				$window.alert($mbTranslate.instant('Failed to create a new tenant.'));
			});
		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return job;
	},
	groups: ['/tenant/tenants#more']
}

