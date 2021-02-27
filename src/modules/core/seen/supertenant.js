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
import mblowfish from 'mblowfish';
import seen from '../../../seen'
/**
 * @ngdoc Factories
 * @name SupertenantTenant
 * @description Tenant
 */
mblowfish.factory('SupertenantTenant', seen.factory({
	url: '/api/v2/super-tenant/tenants',
	resources: [{
		name: 'Configuration',
		factory: 'SupertenantConfiguration',
		type: 'collection',
		url: '/configurations'
	}, {
		name: 'Member',
		factory: 'SupertenantMember',
		type: 'collection',
		url: '/members'
	}, {
		name: 'Invoice',
		factory: 'SupertenantInvoice',
		type: 'collection',
		url: '/invoices'
	}, {
		name: 'Ticket',
		factory: 'SupertenantTicket',
		type: 'collection',
		url: '/tickets'
	}]
}));

/**
 * @ngdoc Factories
 * @name SupertenantConfiguration
 * @description  configuration
 */
mblowfish.factory('SupertenantConfiguration', seen.factory({
	url: '/api/v2/super-tenant/tenants/{tenant_id}/configurations'
}));

/**
 * @ngdoc Factories
 * @name SupertenantMember
 * @description  members
 */
mblowfish.factory('SupertenantMember', seen.factory({
	url: '/api/v2/super-tenant/tenants/{tenant_id}/members'
}));

/**
 * @ngdoc Factories
 * @name SupertenantInvoice
 * @description Invoice
 */
mblowfish.factory('SupertenantInvoice', seen.factory({
	url: '/api/v2/super-tenant/invoices'
}));

/**
 * @ngdoc Factories
 * @name SupertenantTicket
 * @description Ticket
 */
mblowfish.factory('SupertenantTicket', seen.factory({
	url: '/api/v2/super-tenant/tickets',
	resources: [{
		name: 'Comment',
		factory: 'SupertenantComment',
		type: 'collection',
		url: '/comments'
	}]
}));

/**
 * @ngdoc Factories
 * @name SupertenantComment
 * @description Commetn
 */
mblowfish.factory('SupertenantComment', seen.factory({
	url: '/api/v2/super-tenant/tickets/{ticket_id}/comments'
}));



/**
 * @ngdoc Services
 * @name $supertenant
 * @description Manages all items of a supertenant
 */
mblowfish.service('$supertenant', seen.service({
	resources: [{
		name: 'Tenant',
		factory: 'SupertenantTenant',
		type: 'collection',
		url: '/api/v2/super-tenant/tenants'
	}, {
		name: 'Ticket',
		factory: 'SupertenantTicket',
		type: 'collection',
		url: '/api/v2/super-tenant/tickets'
	}, {
		name: 'Invoice',
		factory: 'SupertenantInvoice',
		type: 'collection',
		url: '/api/v2/super-tenant/invoices'
	}]
}));
