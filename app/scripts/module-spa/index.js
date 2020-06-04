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

mblowfish.config(function($mbEditorProvider, $mbViewProvider) {
	$mbEditorProvider
		.addEditor('/spas/repository/:spaId', {
			controller: 'amdRepositorySpaCtrl',
			templateUrl: 'views/amd-rspa.html',
		})
		.addEditor('/spas/:spaId', {
			templateUrl: 'views/amd-spa.html',
			controller: 'AmdTenantSpaCtrl',
			controllerAs: 'ctrl'
		});



	var viewGroups = ['Applications'];

	$mbViewProvider
		.addView('/spas', {
			controller: 'amdSpasCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-spas.html',
			title: 'spas',
			icon: 'apps',
			groups: viewGroups,
		}) //
		.addView('/spas-upload', {
			controller: 'amdSpaUploadCtrl',
			templateUrl: 'views/amd-spa-upload.html',
			title: 'Upload spa',
			icon: 'file_upload',
			groups: viewGroups,
		}) //
		.addView('/spas-repository', {
			controller: 'amdReposiotrySpasCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-rspas.html',
			title: 'Repository',
			icon: 'cloud_upload',
			groups: viewGroups,
		});
});