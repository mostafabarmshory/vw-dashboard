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

//------------------------------------------------------------
// Resources Types
//------------------------------------------------------------
var AMD_CMS_CONTENT_RT = '/cms/content';
var AMD_CMS_METADATA_RT = '/cms/microdata';
var AMD_CMS_TERMTAXONOMIES_RT = '/cms/term-taxonomies';


//------------------------------------------------------------
// Stoer Paths
//------------------------------------------------------------
var AMD_CMS_CONTENT_SP = '/cms/contents';
var AMD_CMS_METADATA_SP = '/cms/microdata';
var AMD_CMS_TERMTAXONOMIES_SP = '/cms/term-taxonomies';

mblowfish.config(function(
	/* Mblowfish */ $mbViewProvider, $mbEditorProvider, $mbResourceProvider) {

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
		.addView('/cms/contents-new', {
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

	/* @ngInject */
	var termTaxonomiesCtrl = function($scope, $resource) {
		$scope.multi = false;
		var value = [];
		this.toggleSelected = function(item) {
			if (this.isSelected(item)) {
				var index = value.indexOf(item);
				value.splice(index, 1);
			} else {
				value.push(item);
			}
			$resource.setValue(value);
		};
		this.isSelected = function(item) {
			return value.indexOf(item) >= 0;
		};
	};

	$mbResourceProvider
		.addPage('cms.term-taxonomies', {
			tags: [AMD_CMS_TERMTAXONOMIES_RT],
			title: 'Term-Taxonomy',
			icon: 'label',
			templateUrl: 'views/resources/amd-term-taxonomy.html',
			controller: termTaxonomiesCtrl,
			controllerAs: 'resourceCtrl',
			priority: 8
		})
		.addPage('cms.term-taxonomies.category', {
			tags: [AMD_CMS_TERMTAXONOMIES_RT],
			title: 'Category',
			icon: 'label',
			templateUrl: 'views/resources/amd-term-taxonomy-category.html',
			controller: termTaxonomiesCtrl,
			controllerAs: 'resourceCtrl',
			priority: 8
		})
		.addPage('cms.term-taxonomies.tag', {
			tags: [AMD_CMS_TERMTAXONOMIES_RT],
			title: 'Tag',
			icon: 'label',
			templateUrl: 'views/resources/amd-term-taxonomy-tag.html',
			controller: termTaxonomiesCtrl,
			controllerAs: 'resourceCtrl',
			priority: 8
		})
		.addPage('cms.metadata.keyval', {
			tags: [AMD_CMS_METADATA_RT],
			title: 'Metadatum',
			icon: 'label',
			/* @ngInject */
			controller: function($scope, $value, $resource) {
				var value = _.isArray($value) ? $value : [{}];
				$scope.meta = value[0];
				$scope.setKey = function(key) {
					value[0].key = key;
					$resource.setValue(value);
				};
				$scope.setValue = function(val) {
					value[0].value = val;
					$resource.setValue(value);
				};
			},
			controllerAs: 'ctrl',
			templateUrl: 'views/resources/amd-cms-microdatum.html',
			priority: 8
		});

});