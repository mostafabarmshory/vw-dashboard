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
angular.module('ngMaterialDashboardCollection').config(function($routeProvider) {
	$routeProvider//
		.when('/collections', {
			controller: 'AmdCollectionsCtrl',
			templateUrl: 'views/amd-collections.html',
			name: 'Collections',
			icon: 'storage',
			navigate: true,
			protect: true,
		})//
		.when('/collections/new', {
			controller: 'AmdCollectionNewCtrl',
			templateUrl: 'views/amd-collection-new.html',
			protect: true,
		})//
		.when('/collections/:collectionId/documents/:documentId', {
			controller: 'AmdDocumentCtrl',
			templateUrl: 'views/amd-document.html',
			protect: true,
		})//
		.when('/collections/:id', {
			controller: 'AmdCollectionCtrl',
			templateUrl: 'views/amd-collection.html',
			protect: true,
		});
});
