/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
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
mblowfish.config(function($mbEditorProvider, $mbViewProvider, $mbActionsProvider) {
	$mbEditorProvider
		.addEditor('/tenant/tenants/:tenantId', {
			templateUrl: 'views/amd-tenant-tenant.html',
			controller: 'AmdTenantTenantController',
			controllerAs: 'ctrl'
		})
		.addEditor('/tenant/tickets/:ticketId', {
			templateUrl: 'views/amd-tenant/ticket.html',
			controller: 'AmdTenantTicketController',
		})
		.addEditor('/tenant/invoices', {
			templateUrl: 'views/amd-tenant/invoice-list.html',
			controller: 'AmdTenantInvoicesController',
			groups: ['tenant'],
			name: 'Invoices',
			icon: 'attach_money',
		}) //
		.addEditor('/tenant/invoices/:invoiceId', {
			templateUrl: 'views/amd-tenant/invoice.html',
			controller: 'AmdTenantInvoiceController',
		}) //
		.addEditor('/receipts/:id', {
			templateUrl: 'views/amd-tenant-receipt.html',
			controller: 'AmdTenantReceiptCtrl',
			helpId: 'receipt'
		});





	var groupsView = ['Tenant'];

	$mbViewProvider
		.addView('/tenant/tenants', {
			templateUrl: 'views/amd-tenant-tenants.html',
			controller: 'AmdTenantTenantsController',
			controllerAs: 'ctrl',
			groups: groupsView,
			title: 'Tenants',
			icon: 'business'
		})
		.addView('/tenant/tickets', {
			templateUrl: 'views/amd-tenant/ticket-list.html',
			controller: 'AmdTenantTicketsController',
			groups: groupsView,
			title: 'Tickets',
			icon: 'question_answer',
		}) //
		.addView('/tenant/invoices-new', {
			templateUrl: 'views/amd-tenant/invoice-new.html',
			controller: 'AmdTenantInvoiceController',
			title: 'New invoice',
			groups: groupsView,
		}) //
		.addView('/tenant/settings/security', {
			templateUrl: 'views/amd-setting-security.html',
			controller: 'AmdSettingsSecurityCtrl',
			groups: groupsView,
			title: 'Security',
			icon: 'font_download',
		})
		.addView('/tenant/settings/local-setting', {
			templateUrl: 'views/amd-local-setting.html',
			controller: 'AmdLocalSettingsCtrl',
			groups: groupsView,
			title: 'Local settings',
			icon: 'settings_applications',
		});




	var EVENT_NAME = '/tenant/tenants';

	$mbActionsProvider
		.addAction({
			id: 'create:/tenant/tenants',
			priority: 10,
			icon: 'store',
			title: 'New Tenant',
			description: 'Creates new sub-tenant in the current one',
			/*
			 * @ngInject
			 */
			action: function($tenant, $navigator, $mbDispatcher, $window, $mbTranslate) {
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
						$mbDispatcher.dispatch(EVENT_NAME, {
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
		});
});
