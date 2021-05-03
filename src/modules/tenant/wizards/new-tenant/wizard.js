
import Constants from '../../Constants';


export default {
	title: 'New Tenant',
	description: 'Creates new tenant and site.',
	pages: [
		Constants.TENANT_NEW_WIZARD + '#info',
		Constants.TENANT_NEW_WIZARD + '#domain',
	],

	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		var data = $wizard;
		return data.title && data.domain && data.subdomain;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		var data = $wizard.data;
		return $mbActions.exec(Constants.TENANT_TENANTS_CREATE_ACTION, {
			values: [data]
		});
	},
}

