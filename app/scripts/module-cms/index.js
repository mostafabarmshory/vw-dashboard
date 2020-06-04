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

mblowfish.config(function(
	/* Mblowfish */ $mbViewProvider, $mbEditorProvider) {

	var viewGroups = ['Content Management'];
	$mbViewProvider
		.addView('/cms/contents', {
			title: 'Contents',
			controller: 'AmdContentsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-contents.html',
			groups: viewGroups,
			icon: 'image',
		})
		.addView('/cms/contents/new', {
			title: 'Upload',
			controller: 'AmdContentNewCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-content-new.html',
			groups: viewGroups,
			icon: 'cloud_upload',
		}) //
		.addView('/cms/terms', {
			title: 'Terms',
			controller: 'AmdCmsTermsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-terms.html',
			groups: viewGroups,
			icon: 'title',
		})
		.addView('/cms/term-taxonomies', {
			title: 'Term taxonomis',
			controller: 'AmdCmsTermTaxonomiesCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-term-taxonomies.html',
			groups: viewGroups,
			icon: 'class',
		});

	$mbEditorProvider
		.addEditor('/cms/contents/:contentId', {
			controller: 'AmdContentCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-content.html',
		})
		.addEditor('/cms/terms/:termId', {
			controller: 'AmdCmsTermCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-term.html'
		})
		.addEditor('/cms/term-taxonomies/:itemId', {
			templateUrl: 'views/amd-term-taxonomy.html',
		});


	//	$mbResourceProvider
	// .addPage({
	//		type: 'cms.term-taxonomies.single',
	//		tags: ['cms/term-taxonomies'],
	//		label: 'Content term-taxonomy',
	//		icon: 'label',
	//		templateUrl: 'views/resources/amd-term-taxonomy.html',
	//        /*
	//         * @ngInject
	//         */
	//		controller: function($scope) {
	//			$scope.multi = false;
	//			this.value = $scope.value;
	//			this.setSelected = function(item) {
	//				$scope.$parent.setValue(new CmsTermTaxonomy(item));
	//				$scope.$parent.answer();
	//			};
	//			this.isSelected = function(item) {
	//				return item === this.value || item.id === this.value.id;
	//			};
	//		},
	//		controllerAs: 'resourceCtrl',
	//		priority: 8
	//	})
	//	.addPage({
	//		type: 'cms.microdata.keyval',
	//		tags: ['/cms/microdata'],
	//		label: 'Microdatum',
	//		icon: 'label',
	//		templateUrl: 'views/resources/amd-cms-microdatum.html',
	//		priority: 8
	//	});

});