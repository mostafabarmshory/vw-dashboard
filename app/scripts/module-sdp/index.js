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
mblowfish.config(function($mbResourceProvider, $mbViewProvider, $mbEditorProvider) {
	$mbResourceProvider
		.addPage('sdp-category-list', {
			label: 'Category list',
			templateUrl: 'views/resources/sdp-category-list.html',
			controller: 'SdpCategoryListResourceCtrl',
			tags: ['sdp-category']
		})
		.addPage('sdp-categories-list', {
			label: 'Categories list',
			templateUrl: 'views/resources/sdp-categories-list.html',
			controller: 'SdpCategoriesListResourceCtrl',
			tags: ['sdp-category-list']
		})
		.addPage('sdp-tag-list', {
			label: 'Tag list',
			templateUrl: 'views/resources/sdp-tag-list.html',
			controller: 'SdpTagListResourceCtrl',
			tags: ['sdp-tag']
		});



	$mbEditorProvider
		.addEditor('/sdp/asset/:assetId', {
			controller: 'SdpAssetCtrl',
			templateUrl: 'views/sdp-asset.html',
		})
		.addEditor('/sdp/category/:categoryId', {
			controller: 'SdpCategoryCtrl',
			templateUrl: 'views/sdp-category.html',
		})//
		.addEditor('/sdp/tag/:tagId', {
			controller: 'SdpTagCtrl',
			templateUrl: 'views/sdp-tag.html',
		})//

		.addEditor('/sdp/menu/:collectionId/item/:documentId', {
			controller: 'SdpEventMenuItemCtrl',
			templateUrl: 'views/sdp-event-menu-item.html',
		})//
		.addEditor('/sdp/menu/:collectionId/item/:documentId/new', {
			controller: 'SdpEventMenuItemNewCtrl',
			templateUrl: 'views/sdp-event-menu-item-new.html',
		})
		.addEditor('/sdp/item/:collectionId/document/:documentId', {
			controller: 'AmdDocumentCtrl',
			templateUrl: 'views/sdp-event-document.html',
		});

	var viewGroups = ['Digital Assets'];

	$mbViewProvider
		.addView('/sdp/assets', {
			controller: 'SdpAssetsCtrl',
			templateUrl: 'views/sdp-assets.html',
			title: 'Assets',
			icon: 'web_asset',
			groups: viewGroups,
		})//
		.addView('/sdp/assets-new', {
			controller: 'SdpAssetNewCtrl',
			templateUrl: 'views/sdp-asset-new.html',
			title: 'New asset',
			icon: 'add',
			groups: viewGroups,
		})//
		.addView('/sdp/categories', {
			controller: 'SdpCategoriesCtrl',
			templateUrl: 'views/sdp-categories.html',
			title: 'Categories',
			icon: 'folder',
			groups: viewGroups,
		})//
		.addView('/sdp/categories-new', {
			controller: 'SdpCategoryNewCtrl',
			templateUrl: 'views/sdp-category-new.html',
			title: 'New category',
			icon: 'add',
			groups: viewGroups,
		})
		.addView('/sdp/tags', {
			controller: 'SdpTagsCtrl',
			templateUrl: 'views/sdp-tags.html',
			title: 'Tags',
			icon: 'label',
			groups: viewGroups,
		})//
		.addView('/sdp/tags-new', {
			controller: 'SdpTagNewCtrl',
			templateUrl: 'views/sdp-tag-new.html',
			title: 'New tag',
			icon: 'add',
			groups: viewGroups,
		})
		.addView('/sdp/collections', {
//			controller: 'AmdCollectionsCtrl',
			templateUrl: 'views/amd-collections.html',
			title: 'Collections',
			icon: 'storage',
			groups: viewGroups,
		})//
		.addView('/sdp/downloads-link', {
			controller: 'SdpDownloadedFilesLinkCtrl',
			templateUrl: 'views/sdp-downloaded-files-link.html',
			title: 'Downloaded links',
			icon: 'cloud_download',
			groups: viewGroups,
		});
});

