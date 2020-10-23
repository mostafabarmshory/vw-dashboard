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
	//	AMD_CMS_TERMTAXONOMIES_RT: '/cms/term-taxonomies',


	//------------------------------------------------------------
	// Stoer Paths
	//------------------------------------------------------------
	SDP_ASSETS_SP: '/sdp/assets',

	//------------------------------------------------------------
	// Views
	//------------------------------------------------------------
	//	AMD_CMS_VIEW_CONTENT_NEW_PATH: '/cms/contents-new',


	//------------------------------------------------------------
	// ACTIONS
	//------------------------------------------------------------
	//	AMD_CMS_TERMTAXONOMIES_DELETE_ACTION: 'cms.termTaxonomies.delete',
	SDP_ASSET_EDIT_ACTION: 'sdp.assets.edit',
	SDP_ASSET_DELETE_ACTION: 'sdp.assets.delete',

	//------------------------------------------------------------
	// wizards
	//------------------------------------------------------------
	//	AMD_CMS_TERMTAXONOMY_NEW_WIZARD: '/cms/wizards/new-term-taxonomy',
});

//mblowfish.run(function($mbToolbar) {
//	'ngInject';
//
//	$mbToolbar.getToolbar(AMD_CMS_VIEW_TERMS_PATH)
//		.addAction(AMD_CMS_TERMS_CREATE_ACTION);
//		
//	$mbToolbar.getToolbar(AMD_CMS_VIEW_TERMTAXONOMIES_PATH)
//		.addAction(AMD_CMS_TERMTAXONOMIES_CREATE_ACTION);
//});