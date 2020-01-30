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


/**
 * 
 */
angular.module('ngMaterialDashboardCms').config(function($routeProvider) {
	$routeProvider //
		.when('/contents', {
			controller: 'AmdContentsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-contents.html',
			navigate: true,
			groups: ['content-management'],
			name: 'Contents',
			icon: 'image',
			protect: true
		}) //
		.when('/contents/new', {
			templateUrl: 'views/amd-content-new.html',
			navigate: true,
			groups: ['content-management'],
			name: 'New Content',
			icon: 'note_add',
			protect: true,
		}) //
		.when('/content/:contentId', {
			controller: 'AmdContentCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-content.html',
			protect: true,
		})


		.when('/terms', {
			controller: 'AmdCmsTermsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-terms.html',
			navigate: true,
			groups: ['content-management'],
			name: 'Terms',
			icon: 'note_add',
			protect: true
		})
		.when('/terms/:termId', {
			controller: 'AmdCmsTermCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-term.html'
		})
		.when('/term-taxonomies', {
			controller: 'AmdCmsTermTaxonomiesCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-term-taxonomies.html',
			navigate: true,
			groups: ['content-management'],
			name: 'Term taxonomis',
			icon: 'note_add',
			protect: true
		})
		.when('/term-taxonomies/:taxonomyId', {
			controller: 'AmdCmsTermTaxonomyCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-term-taxonomy.html',
			protect: true
		});
});