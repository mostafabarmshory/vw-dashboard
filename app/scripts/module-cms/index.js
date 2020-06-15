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
});



mblowfish.config(function(
	/* Mblowfish */ $mbViewProvider, $mbEditorProvider, $mbResourceProvider) {

	var viewGroups = ['Content Management'];
	$mbViewProvider
		.addView(AMD_CMS_VIEW_CONTENTS_PATH, {
			title: 'Contents',
			controller: 'AmdContentsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-contents.html',
			groups: viewGroups,
			icon: 'image',
		})
		.addView(AMD_CMS_VIEW_CONTENT_NEW_PATH, {
			title: 'Upload',
			controller: 'AmdContentNewCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-content-new.html',
			groups: viewGroups,
			icon: 'cloud_upload',
		}) //
		.addView(AMD_CMS_VIEW_TERMS_PATH, {
			title: 'Terms',
			controller: 'AmdCmsTermsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-terms.html',
			groups: viewGroups,
			icon: 'title',
		})
		.addView(AMD_CMS_VIEW_TERM_TAXONOMIES_PATH, {
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
		})
		.addPage('cms-content-image', {
			icon: 'image',
			label: 'Images',
			templateUrl: 'views/cms/resources/image-url.html',
			controller: 'AmdCmsContentUrlResourceCtrl',
			controllerAs: 'ctrl',
			priority: 10,
			tags: ['image-url', 'avatar', 'thumbnail']
		});
	//	.addPage({
	//		type: 'content-upload',
	//		icon: 'file_upload',
	//		label: 'Upload',
	//		templateUrl: 'views/resources/mb-cms-content-upload.html',
	//		/*
	//		 * @ngInject
	//		 */
	//		controller: function($scope, $cms, $mbTranslate, $mbCrypto) {
	//
	//			/*
	//			 * Extends collection controller
	//			 */
	//			angular.extend(this, $controller('AmWbSeenCmsContentsCtrl', {
	//				$scope: $scope
	//			}));
	//
	//			this.absolute = false;
	//			this.files = [];
	//
	//			/**
	//			 * Sets the absolute mode
	//			 *
	//			 * @param {boolean}
	//			 *            absolute mode of the controler
	//			 */
	//			this.setAbsolute = function(absolute) {
	//				this.absolute = absolute;
	//			}
	//
	//			/**
	//			 * Checks if the mode is absolute
	//			 *
	//			 * @return absolute mode of the controller
	//			 */
	//			this.isAbsolute = function() {
	//				return this.absolute;
	//			}
	//
	//			/*
	//			 * Add answer to controller
	//			 */
	//			var ctrl = this;
	//			$scope.answer = function() {
	//				// create data
	//				var data = {};
	//				data.name = this.name || $mbCrypto.uuid();
	//				data.description = this.description || 'Auto loaded content';
	//				var file = null;
	//				if (angular.isArray(ctrl.files) && ctrl.files.length) {
	//					file = ctrl.files[0].lfFile;
	//					data.title = file.name;
	//				}
	//				// upload data to server
	//				return ctrl.uploadFile(data, file)//
	//					.then(function(content) {
	//						var value = '/api/v2/cms/contents/' + content.id + '/content';
	//						if (ctrl.isAbsolute()) {
	//							value = getDomain() + value;
	//						}
	//						return value;
	//					})//
	//					.catch(function() {
	//						alert('Failed to create or upload content');
	//					});
	//			};
	//			// init the controller
	//			this.init();
	//
	//			// re-labeling lf-ng-md-file component for multi languages support
	//			angular.element(function() {
	//				var elm = angular.element('.lf-ng-md-file-input-drag-text');
	//				if (elm[0]) {
	//					elm.text($mbTranslate.instant('Drag & Drop File Here'));
	//				}
	//
	//				elm = angular.element('.lf-ng-md-file-input-button-brower');
	//				if (elm[0] && elm[0].childNodes[1] && elm[0].childNodes[1].data) {
	//					elm[0].childNodes[1].data = ' ' + $mbTranslate.instant('Browse');
	//				}
	//
	//				elm = angular.element('.lf-ng-md-file-input-button-remove');
	//				if (elm[0] && elm[0].childNodes[1] && elm[0].childNodes[1].data) {
	//					elm[0].childNodes[1].data = $mbTranslate.instant('Remove');
	//				}
	//
	//				elm = angular.element('.lf-ng-md-file-input-caption-text-default');
	//				if (elm[0]) {
	//					elm.text($mbTranslate.instant('Select File'));
	//				}
	//			});
	//		},
	//		controllerAs: 'ctrl',
	//		priority: 1,
	//		tags: ['image', 'audio', 'vedio', 'file', 'url', 'image-url', 'avatar', 'thumbnail']
	//	})
});