export default {
	title: 'Loading Tenant Settings',
	action: function($mbTenant) {
		'ngInject';
		return $mbTenant.reload();
	}
}