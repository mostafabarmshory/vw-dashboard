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
	AMD_CMS_CONTENT_RT: '/cms/contents',
	AMD_CMS_METADATA_RT: '/cms/metadata',
	AMD_CMS_TERMTAXONOMIES_RT: '/cms/term-taxonomies',


	//------------------------------------------------------------
	// Stoer Paths
	//------------------------------------------------------------
	AMD_CMS_CONTENT_SP: '/cms/contents',
	AMD_CMS_METADATA_SP: '/cms/metadata',
	AMD_CMS_TERMTAXONOMIES_SP: '/cms/term-taxonomies',
	AMD_CMS_TERMS_SP: '/cms/terms',


	//------------------------------------------------------------
	// Views
	//------------------------------------------------------------
	AMD_CMS_VIEW_CONTENT_NEW_PATH: '/cms/contents-new',
	AMD_CMS_VIEW_CONTENTS_PATH: '/cms/contents',
	AMD_CMS_VIEW_TERMS_PATH: '/cms/terms',
	AMD_CMS_VIEW_TERMTAXONOMIES_PATH: '/cms/term-taxonomies',
	AMD_CMS_VIEW_IMAGES_PATH: '/cms/images',


	//------------------------------------------------------------
	// ACTIONS
	//------------------------------------------------------------
	AMD_CMS_CONTENTS_EDIT_ACTION: 'amd.cms.contents.edit',
	AMD_CMS_CONTENTS_DELETE_ACTION: 'amd.cms.contents.delete',
	AMD_CMS_CONTENTS_UPDATE_ACTION: 'amd.cms.contents.update',
	AMD_CMS_CONTENTS_PROPERTIES_ACTION: 'amd.cms.contents.properties',
	AMD_CMS_CONTENTS_NEWPAGE_ACTION: 'amd.cms.contents.newPage',
	AMD_CMS_TERMS_CREATE_ACTION: 'cms.terms.create',
	AMD_CMS_TERMS_DELETE_ACTION: 'cms.terms.delete',
	AMD_CMS_TERMTAXONOMIES_CREATE_ACTION: 'cms.termTaxonomies.create',
	AMD_CMS_TERMTAXONOMIES_DELETE_ACTION: 'cms.termTaxonomies.delete',

	//------------------------------------------------------------
	// wizards
	//------------------------------------------------------------
	AMD_CMS_CONTENTS_NEWPAGE_WIZARD: '/cms/wizards/new-page',
	AMD_CMS_TERM_NEW_WIZARD: '/cms/wizards/new-term',
	AMD_CMS_TERMTAXONOMY_NEW_WIZARD: '/cms/wizards/new-term-taxonomy',
});

mblowfish.run(function($mbToolbar) {
	'ngInject';

	$mbToolbar.getToolbar(AMD_CMS_VIEW_TERMS_PATH)
		.addAction(AMD_CMS_TERMS_CREATE_ACTION);
		
	$mbToolbar.getToolbar(AMD_CMS_VIEW_TERMTAXONOMIES_PATH)
		.addAction(AMD_CMS_TERMTAXONOMIES_CREATE_ACTION);
		

});

