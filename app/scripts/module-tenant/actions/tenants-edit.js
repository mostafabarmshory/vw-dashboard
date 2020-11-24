mblowfish.addAction(TENANT_TENANTS_EDIT_ACTION, {
	priority: 10,
	icon: 'store',
	title: 'Edit Tenant',
	description: 'Open an editor to update a tenant',
	action: function($event, $location) {
		'ngInject';
		//tenant/tenants/{{::pobject.id}}
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return;
		}
		_.forEach(values, function(model) {
			$location.path('/tenant/tenants/' + model.id);
		});
	},
	groups: ['/tenant/tenants#more']
});