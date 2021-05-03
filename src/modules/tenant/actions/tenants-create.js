
import Constants from '../Constants';

export default {
	priority: 10,
	icon: 'store',
	group: 'Tenant',
	title: 'New Tenant',
	description: 'Creates new sub-tenant in the current one',
	action: function($tenant, $event, $mbWizard, $q, $mbDispatcherUtil) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(Constants.TENANT_NEW_WIZARD);
		}

		var jobs = [],
			tenants = [];
		_.forEach(values, function(tenantData) {
			var promise = $tenant.putTenant(tenantData)
				.then(function(newTenant) {
					tenants.push(newTenant);
				});
			jobs.push(promise);
		});

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(Constants.TENANT_TENANTS_SP, tenants);
			});

	}
}

