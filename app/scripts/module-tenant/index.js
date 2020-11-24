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


mblowfish.addConstants({
	//------------------------------------------------------------
	// Resources Types
	//------------------------------------------------------------
	TENANT_TENANTS_RT: '/tenant/tenants',
	//	AMD_CMS_METADATA_RT: '/cms/metadata',
	//	AMD_CMS_TERMTAXONOMIES_RT: '/cms/term-taxonomies',


	//------------------------------------------------------------
	// Stoer Paths
	//------------------------------------------------------------
	TENANT_TENANTS_SP: '/tenant/tenants',
	//	AMD_CMS_METADATA_SP: '/cms/metadata',
	//	AMD_CMS_TERMTAXONOMIES_SP: '/cms/term-taxonomies',
	//	AMD_CMS_TERMS_SP: '/cms/terms',


	//------------------------------------------------------------
	// Views
	//------------------------------------------------------------
	TENANT_TENANTS_VIEW_PATH: '/tenant/tenants',
	//	AMD_CMS_VIEW_CONTENTS_PATH: '/cms/contents',
	//	AMD_CMS_VIEW_TERMS_PATH: '/cms/terms',
	//	AMD_CMS_VIEW_TERM_TAXONOMIES_PATH: '/cms/term-taxonomies',


	//------------------------------------------------------------
	// ACTIONS
	//------------------------------------------------------------
	TENANT_TENANTS_CREATE_ACTION: 'tenant.tenants.create',
	TENANT_TENANTS_EDIT_ACTION: 'tenant.tenants.edit',
});




// TODO: maso, 2020: check the following editor
//		.addEditor('/tenant/invoices', {
//			templateUrl: 'views/amd-tenant/invoice-list.html',
//			controller: 'AmdTenantInvoicesController',
//			groups: ['tenant'],
//			name: 'Invoices',
//			icon: 'attach_money',
//		}) //;




mblowfish.run(function($mbToolbar) {
	'ngInject';

	$mbToolbar.getToolbar(TENANT_TENANTS_VIEW_PATH)
		.addAction(TENANT_TENANTS_CREATE_ACTION);

});
