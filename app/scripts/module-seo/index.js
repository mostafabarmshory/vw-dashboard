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


	//------------------------------------------------------------
	// Stoer Paths
	//------------------------------------------------------------


	//------------------------------------------------------------
	// Views
	//------------------------------------------------------------


	//------------------------------------------------------------
	// ACTIONS
	//------------------------------------------------------------
	AMD_SEO_CONTENTS_RENDER_ACTION: 'amd.seo.contents.render',
});




mblowfish.config(function($mbEditorProvider, $mbViewProvider) {
	$mbEditorProvider
		.addEditor('/seo/backends/:id', {
			controller: 'AmdSeoBackendCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-seo-backend.html',
		})
		.addEditor('/seo/links/:itemId', {
			templateUrl: 'views/amd-seo-link.html',
		});


	$mbViewProvider
		.addView('/seo/backends', {
			controller: 'AmdSeoBackendsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-seo-backends.html',
			groups: ['seo'],
			title: 'Prerender backends',
			icon: 'dvr',
		})
		.addView('/seo/backends-new', {
			controller: 'AmdSeoBackendNewCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-seo-backend-new.html',
			groups: ['seo'],
			title: 'New prerender backend',
			icon: 'add'
		})
		.addView('/seo/links', {
			controller: 'AmdSeoLinksCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-seo-links.html',
			groups: ['seo'],
			title: 'Sitemap links',
			icon: 'link'
		})
		.addView('/seo/links-new', {
			controller: 'AmdSeoLinkNewCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-seo-link-new.html',
			groups: ['seo'],
			title: 'New sitemap link',
			icon: 'add'
		})
		.addView('/seo/sitemap', {
			templateUrl: 'views/sitemap.html',
			groups: ['seo'],
			title: 'View Sitemap',
			icon: 'public'
		});
});