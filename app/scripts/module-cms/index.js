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
	AMD_CMS_VIEW_TERM_TAXONOMIES_PATH: '/cms/term-taxonomies',


	//------------------------------------------------------------
	// ACTIONS
	//------------------------------------------------------------
	AMD_CMS_CONTENTS_EDIT_ACTION: 'amd.cms.contents.edit',
	AMD_CMS_CONTENTS_DELETE_ACTION: 'amd.cms.contents.delete',
	AMD_CMS_CONTENTS_UPDATE_ACTION: 'amd.cms.contents.update',
	AMD_CMS_CONTENTS_PROPERTIES_ACTION: 'amd.cms.contents.properties',
});



mblowfish.config(function($mbEditorProvider, $mbResourceProvider) {


	$mbEditorProvider
		.addEditor('/cms/terms/:termId', {
			controller: 'AmdCmsTermCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-term.html'
		})
		.addEditor('/cms/term-taxonomies/:itemId', {
			templateUrl: 'views/amd-term-taxonomy.html',
		});

	/* @ngInject */
	var TermTaxonomiesCtrl = function($scope, $resource) {
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
			controller: TermTaxonomiesCtrl,
			controllerAs: 'resourceCtrl',
			priority: 8
		})
		.addPage('cms.term-taxonomies.category', {
			tags: [AMD_CMS_TERMTAXONOMIES_RT],
			title: 'Category',
			icon: 'label',
			templateUrl: 'views/resources/amd-term-taxonomy-category.html',
			controller: TermTaxonomiesCtrl,
			controllerAs: 'resourceCtrl',
			priority: 8
		})
		.addPage('cms.term-taxonomies.tag', {
			tags: [AMD_CMS_TERMTAXONOMIES_RT],
			title: 'Tag',
			icon: 'label',
			templateUrl: 'views/resources/amd-term-taxonomy-tag.html',
			controller: TermTaxonomiesCtrl,
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