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
	SDP_DRIVES_SP: '/sdp/assets',
	SDP_TAGS_SP: '/sdp/tags',
	SDP_CATEGORIES_SP: '/sdp/categories',
	SDP_LINKS_SP: '/sdp/links',

	//------------------------------------------------------------
	// Views
	//------------------------------------------------------------
	SDP_VIEW_DRIVES_PATH: '/sdp/storages',
	SDP_VIEW_LINKS_PATH: '/sdp/links',
	SDP_VIEW_CATEGORIES_PATH: '/sdp/categories',
	SDP_VIEW_TAGS_PATH: '/sdp/tags',

	//------------------------------------------------------------
	// ACTIONS
	//------------------------------------------------------------
	//	AMD_CMS_TERMTAXONOMIES_DELETE_ACTION: 'cms.termTaxonomies.delete',
	SDP_ASSETS_EDIT_ACTION: 'sdp.assets.edit',
	SDP_ASSETS_DELETE_ACTION: 'sdp.assets.delete',
	SDP_ASSETS_CREATE_ACTION: 'sdp.assets.create',

	SDP_TAGS_EDIT_ACTION: 'sdp.tags.edit',
	SDP_TAGS_DELETE_ACTION: 'sdp.tags.delete',
	SDP_TAGS_CREATE_ACTION: 'sdp.tags.create',

	SDP_CATEGORIES_EDIT_ACTION: 'sdp.categories.edit',
	SDP_CATEGORIES_DELETE_ACTION: 'sdp.categories.delete',
	SDP_CATEGORIES_CREATE_ACTION: 'sdp.categories.create',

	SDP_DRIVES_EDIT_ACTION: 'sdp.drives.edit',
	SDP_DRIVES_DELETE_ACTION: 'sdp.drives.delete',
	SDP_DRIVES_CREATE_ACTION: 'sdp.drives.create',

	//------------------------------------------------------------
	// wizards
	//------------------------------------------------------------
	SDP_CATEGORY_CREATE_WIZARD: '/sdp/wizards/new-category',
	SDP_TAG_CREATE_WIZARD: '/sdp/wizards/new-tag',
	SDP_DRIVE_CREATE_WIZARD: '/sdp/wizards/new-storage',
});

mblowfish.run(function($mbToolbar) {
	'ngInject';

	$mbToolbar
		.getToolbar(SDP_VIEW_CATEGORIES_PATH)
		.addAction(SDP_CATEGORIES_CREATE_ACTION);

	$mbToolbar
		.getToolbar(SDP_VIEW_TAGS_PATH)
		.addAction(SDP_TAGS_CREATE_ACTION);

	$mbToolbar
		.getToolbar(SDP_VIEW_DRIVES_PATH)
		.addAction(SDP_DRIVES_CREATE_ACTION);

});