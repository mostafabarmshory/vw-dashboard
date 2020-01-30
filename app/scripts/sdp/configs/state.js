

/*
 * ماشین حالت نرم افزار
 */
angular.module('ngMaterialDashboardSdp').config(function($routeProvider) {
	$routeProvider//

		// قسمت‌های مربوط به سیستم SDP و DM
		/*
		 * Assets
		 */
		.when('/sdp/assets', {
			controller: 'SdpAssetsCtrl',
			templateUrl: 'views/sdp-assets.html',
			name: 'Assets',
			icon: 'web_asset',
			groups: ['asset-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		.when('/sdp/assets/new', {
			controller: 'SdpAssetNewCtrl',
			templateUrl: 'views/sdp-asset-new.html',
			name: 'New asset',
			icon: 'add',
			groups: ['asset-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		.when('/sdp/asset/:assetId', {
			controller: 'SdpAssetCtrl',
			templateUrl: 'views/sdp-asset.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		/*
		 * Categories
		 */
		.when('/sdp/categories', {
			controller: 'SdpCategoriesCtrl',
			templateUrl: 'views/sdp-categories.html',
			name: 'Categories',
			icon: 'folder',
			groups: ['asset-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		.when('/sdp/categories/new', {
			controller: 'SdpCategoryNewCtrl',
			templateUrl: 'views/sdp-category-new.html',
			name: 'New category',
			icon: 'add',
			groups: ['asset-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		.when('/sdp/category/:categoryId', {
			controller: 'SdpCategoryCtrl',
			templateUrl: 'views/sdp-category.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		/*
		 * Tags
		 */
		.when('/sdp/tags', {
			controller: 'SdpTagsCtrl',
			templateUrl: 'views/sdp-tags.html',
			name: 'Tags',
			icon: 'label',
			groups: ['asset-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		.when('/sdp/tags/new', {
			controller: 'SdpTagNewCtrl',
			templateUrl: 'views/sdp-tag-new.html',
			name: 'New tag',
			icon: 'add',
			groups: ['asset-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		.when('/sdp/tag/:tagId', {
			controller: 'SdpTagCtrl',
			templateUrl: 'views/sdp-tag.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		/*
		 * Hide Collections tab
		 */
		.when('/sdp/collections', {
			controller: 'AmdCollectionsCtrl',
			templateUrl: 'views/amd-collections.html',
			name: 'Collections',
			icon: 'storage',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		})//
		.when('/sdp/menu/:collectionId/item/:documentId', {
			controller: 'SdpEventMenuItemCtrl',
			templateUrl: 'views/sdp-event-menu-item.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			}
		})//
		.when('/sdp/menu/:collectionId/item/:documentId/new', {
			controller: 'SdpEventMenuItemNewCtrl',
			templateUrl: 'views/sdp-event-menu-item-new.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			}

		})//
		.when('/sdp/item/:collectionId/document/:documentId', {
			controller: 'AmdDocumentCtrl',
			templateUrl: 'views/sdp-event-document.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			}

		})//
		.when('/sdp/downloads-link', {
			controller: 'SdpDownloadedFilesLinkCtrl',
			templateUrl: 'views/sdp-downloaded-files-link.html',
			name: 'Downloaded links',
			icon: 'cloud_download',
			groups: ['asset-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.__account.permissions.tenant_owner;
			},
		});
});