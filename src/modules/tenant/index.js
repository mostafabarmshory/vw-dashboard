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

import mblowfish from 'mblowfish';

// >> actions
import tenantCreateAction from './actions/tenants-create';
import tenantEditAction from './actions/tenants-edit';
// >> directives
import amdTenantInvoiceDirective from './directives/amdTenantInvoice';
// >> editors
import invoiceEditor from './editors/invoice';
import reciptEditor from './editors/receipt';
import tenantEditor from './editors/tenant';
import ticketEditor from './editors/ticket';
import spaEditor from './editors/spa';
import repoSpaEditor from './editors/repository-spa';

// >> filters
// >> services
import mbTenantService from './services/mbTenant';
// >> views
import invoiceView from './views/invoices';
import tenatnsView from './views/tenants';
import spasView from './views/spas';
import settingsLocalView from './views/local-settings';
import settingsSecurityView from './views/security-settings';
import repoSpasView from './views/repository-spas';


import tenantNewWizard from './wizards/new-tenant/wizard';
import tenantInfoWizardPage from './wizards/new-tenant/tenant-info';
import tenantDomainWizardPage from './wizards/new-tenant/tenant-domain';


import Constants from './Constants';

mblowfish
	.addConstants(Constants)

	// >> actions
	.action(Constants.TENANT_TENANTS_CREATE_ACTION, tenantCreateAction)
	.action(Constants.TENANT_TENANTS_EDIT_ACTION, tenantEditAction)

	// >> directives
	.directive('amdTenantInvoice', amdTenantInvoiceDirective)
	// >> editors
	.editor('/receipts/:id', reciptEditor)

	.editor('/tenant/invoices/:invoiceId', invoiceEditor)
	.editor('/tenant/tenants/:tenantId', tenantEditor)
	.editor('/tenant/tickets/:ticketId', ticketEditor)

	.editor('/spas/:spaId', spaEditor)
	.editor('/spas/repository/:spaId', repoSpaEditor)


	// >> filters
	// >> services
	.provider('$mbTenant', mbTenantService)

	// >> views
	.view('/tenant/invoices', invoiceView)
	.view(TENANT_REPOSITORYSPAS_VIEW, repoSpasView)
	.view('/tenant/settings/local', settingsLocalView)
	.view('/tenant/settings/security', settingsSecurityView)
	.view(TENANT_TENANTS_VIEW_PATH, tenatnsView)
	.view(TENANT_SPAS_VIEW, spasView)
	
	.wizardPage(Constants.TENANT_NEW_WIZARD + '#domain', tenantDomainWizardPage)
	.wizardPage(Constants.TENANT_NEW_WIZARD + '#info', tenantInfoWizardPage)
	.wizard(Constants.TENANT_NEW_WIZARD, tenantNewWizard)

	/**
	Integerate wtih 
	 */
	.run(function($mbToolbar) {
		'ngInject';
		$mbToolbar
			.getToolbar(Constants.TENANT_TENANTS_VIEW_PATH)
			.addAction(Constants.TENANT_TENANTS_CREATE_ACTION);

	});


	// TODO: maso, 2020: check the following editor
	//		.addEditor('/tenant/invoices', {
	//			templateUrl: 'views/amd-tenant/invoice-list.html',
	//			controller: 'AmdTenantInvoicesController',
	//			groups: ['tenant'],
	//			name: 'Invoices',
	//			icon: 'attach_money',
	//		}) //;