/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Factories - SPA - Invoice - Setting - Ticket - Gate - Receipt
 * 
 * Supper tenant factories: - Tenant - Configuration
 */
/**
 * 
 * @ngdoc Factories
 * @name TenantTenant
 * @description Tenants of the Tenants
 * 
 * 
 */
mblowfish.factory('TenantTenant', seen.factory({
	url: '/api/v2/tenant/tenants',
	resources: [{
		name: 'Owner',
		factory: 'TenantAccount',
		type: 'collection',
		url: '/owners'
	}]
}));

/**
 * @ngdoc Factories
 * @name TenantSetting
 * @description Settings of the Tenants
 */
mblowfish.factory('TenantSetting', seen.factory({
	url: '/api/v2/tenant/settings'
}));

/**
 * @ngdoc Factories
 * @name TenantSpa
 * @description A single page application from a tenant
 * 
 * You are free to install and manag multiple SPA on your own tenant.
 */
mblowfish.factory('TenantSpa', seen.factory({
	url: '/api/v2/tenant/spas',
	resources: [{
		name: 'PossibleTransition',
		factory: 'SpaTransition',
		type: 'collection',
		url: '/possible-transitions'
	}, {
		name: 'Transition',
		factory: 'SpaTransition',
		type: 'collection',
		url: '/transitions'
	}]
}));

/**
 * @ngdoc Factories
 * @name TenantSpa
 * @description اطلاعات یک نرم افزار را تعیین می‌کند.
 */
mblowfish.factory('RepositorySpa', seen.factory({
	url: '/api/v2/tenant/spa-repositories/default/spas',
	resources: [{
		name: 'File',
		type: 'binary',
		url: '/file'
	}, {
		name: 'PossibleTransition',
		factory: 'SpaTransition',
		type: 'collection',
		url: '/possible-transitions'
	}, {
		name: 'Transition',
		factory: 'SpaTransition',
		type: 'collection',
		url: '/transitions'
	}]
}));

/**
 * @ngdoc Factories
 * @name TenantAccount
 * @description An account in the tenant module.
 * 
 * An account may be an owner of a tenant. This is a shortcut of accounts
 * in the system.
 */
mblowfish.factory('TenantAccount', seen.factory({
	url: '/api/v2/tenant/accounts'
}));

/**
 * @ngdoc Factories
 * @name SpaTransition
 * @description عمل‌های قابل انجام روی یک نرم افزار را تعیین می‌کند.
 */
mblowfish.factory('SpaTransition', seen.factory({
	url: '/api/v2/tenant/spas/{spa_id}/possible-transitions'
}));

/**
 * @ngdoc Factories
 * @name TenantConfiguration
 * @description Configuration of a tenant
 * 
 * Read only settings of a tenant.
 */
mblowfish.factory('TenantConfiguration', seen.factory({
	url: '/api/v2/tenant/configurations'
}));

/**
 * @ngdoc Factories
 * @name TenantInvoice
 * @description Invoices of a tenant
 */
mblowfish.factory('TenantInvoice', seen.factory({
	url: '/api/v2/tenant/invoices',
	resources: [{
		name: 'Receipt',
		factory: 'BankReceipt',
		type: 'collection',
		url: '/receipts'
	}]
}));

/**
 * @ngdoc Factories
 * @name TenantTicket
 * @description Tickets of a tenant
 */
mblowfish.factory('TenantTicket', seen.factory({
	url: '/api/v2/tenant/tickets',
	resources: [{
		name: 'Comment',
		factory: 'TenantComment',
		type: 'collection',
		url: '/comments'
	}]
}));

/**
 * @ngdoc Factories
 * @name TenantGate
 * @description Gate of the Tenants
 * 
 * All tenants must pay for invoices and a gate required for it. This class
 * model gates for tenants.
 * 
 */
mblowfish.factory('TenantGate', seen.factory({
	url: '/api/v2/tenant/gates'
}));

/**
 * @ngdoc Factories
 * @name TenantComment
 * @description Comment of a tenant
 * 
 * A comment can be added to a ticket. This factory model a comment and allow
 * you to manage.
 * 
 * @attr {integer} id
 * @attr {string} subject
 * @attr {string} description
 */
mblowfish.factory('TenantComment', seen.factory({
	url: '/api/v2/tenant/comments'
}));

/**
 * @ngdoc Factories
 * @name TenantResource
 * @description عمل‌های قابل انجام روی یک نرم افزار را تعیین می‌کند.
 */
mblowfish.factory('TenantResource', seen.factory({
	url: '/api/v2/tenant/resources'
}));

/**
 * @ngdoc Factories
 * @name SubTenant
 * @description sub-tenants of a tenant
 * 
 * A sub-tenant can be added. This factory model a sub-tenant and allow
 * you to manage.
 * 
 * @attr {integer} id
 * @attr {string} title
 * @attr {string} domain
 * @attr {string} subdomain
 * @attr {string} description
 * @attr {integer} parent_id
 */
mblowfish.factory('SubTenant', seen.factory({
	url: '/api/v2/tenant/tenants',
	resources: [{
		name: 'Configuration',
		factory: 'TenantConfiguration',
		type: 'collection',
		url: '/configurations'
	}, {
		name: 'Member',
		factory: 'UserAccount',
		type: 'collection',
		url: '/members'
	}, {
		name: 'Invoice',
		factory: 'TenantInvoice',
		type: 'collection',
		url: '/invoices'
	}, {
		name: 'Ticket',
		factory: 'TenantTicket',
		type: 'collection',
		url: '/tickets'
	}]
}));

/**
 * @ngdoc Services
 * @name $tenant
 * @description Tenant service
 * 
 * manages all tenants.
 */
mblowfish.service('$tenant', seen.service({
	resources: [{
		name: 'Tenant',
		factory: 'TenantTenant',
		type: 'collection',
		url: '/api/v2/tenant/tenants'
	}, {
		name: 'SubTenant',
		factory: 'SubTenant',
		type: 'collection',
		url: '/api/v2/tenant/tenants'
	}, {
		name: 'Setting',
		factory: 'TenantSetting',
		type: 'collection',
		url: '/api/v2/tenant/settings'
	}, {
		name: 'Spa',
		factory: 'TenantSpa',
		type: 'collection',
		url: '/api/v2/tenant/spas'
	}, {
		name: 'RepositorySpa',
		factory: 'RepositorySpa',
		type: 'collection',
		url: '/api/v2/tenant/spa-repositories/default/spas'
	}, {
		name: 'Configuration',
		factory: 'TenantConfiguration',
		type: 'collection',
		url: '/api/v2/tenant/configurations'
	}, {
		name: 'Invoice',
		factory: 'TenantInvoice',
		type: 'collection',
		url: '/api/v2/tenant/invoices'
	}, {
		name: 'Ticket',
		factory: 'TenantTicket',
		type: 'collection',
		url: '/api/v2/tenant/tickets'
	}, {
		name: 'Gate',
		factory: 'TenantGate',
		type: 'collection',
		url: '/api/v2/tenant/gates'
	}, {
		name: 'Comment',
		factory: 'TenantComment',
		type: 'collection',
		url: '/api/v2/tenant/comments'
	}, {
		name: 'Resource',
		factory: 'TenantResource',
		type: 'collection',
		url: '/api/v2/tenant/resources'
	}]
}));
