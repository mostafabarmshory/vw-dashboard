'use strict';

angular.module('ngMaterialDashboardSdp')
/*
 * ماشین حالت نرم افزار
 */
.config(function ($routeProvider) {
    $routeProvider//

    // قسمت‌های مربوط به سیستم SDP و DM
    /*
     * Assets
     */
    .when('/sdp/assets', {
        controller : 'SdpAssetsCtrl',
        templateUrl : 'views/sdp-assets.html',
        name : 'Assets',
        icon : 'web_asset',
        groups : [ 'asset-management' ],
        navigate : true,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'assets',
                title : 'Assets',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'assets',
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    .when('/sdp/assets/new', {
        controller : 'SdpAssetNewCtrl',
        templateUrl : 'views/sdp-asset-new.html',
        name : 'New asset',
        icon : 'add',
        groups : [ 'asset-management' ],
        navigate : true,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'assets',
                title : 'Assets',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'assets',
                groups : [ 'navigationPathMenu' ]
            });
            $actions.newAction({
                id : 'new-asset',
                title : 'New asset',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'assets/new',
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    .when('/sdp/asset/:assetId', {
        controller : 'SdpAssetCtrl',
        templateUrl : 'views/sdp-asset.html',
        navigate : false,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions, $routeParams) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'assets',
                title : 'Assets',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'assets',
                groups : [ 'navigationPathMenu' ]
            });
            $actions.newAction({
                id : 'asset-' + $routeParams.assetId,
                title : 'Asset ' + $routeParams.assetId,
                type : 'link',
                priority : 10,
                visible : true,
                url : 'assets/' + $routeParams.assetId,
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    /*
     * Categories
     */
    .when('/sdp/categories', {
        controller : 'SdpCategoriesCtrl',
        templateUrl : 'views/sdp-categories.html',
        name : 'Categories',
        icon : 'folder',
        groups : [ 'asset-management' ],
        navigate : true,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'categories',
                title : 'Categories',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'categories',
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    .when('/sdp/categories/new', {
        controller : 'SdpCategoryNewCtrl',
        templateUrl : 'views/sdp-category-new.html',
        name : 'New category',
        icon : 'add',
        groups : [ 'asset-management' ],
        navigate : true,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'categories',
                title : 'Categories',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'categories',
                groups : [ 'navigationPathMenu' ]
            });
            $actions.newAction({
                id : 'new-category',
                title : 'New category',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'categories/new',
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    .when('/sdp/category/:categoryId', {
        controller : 'SdpCategoryCtrl',
        templateUrl : 'views/sdp-category.html',
        navigate : false,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions, $routeParams) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'categories',
                title : 'Categories',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'categories',
                groups : [ 'navigationPathMenu' ]
            });
            $actions.newAction({
                id : 'category-' + $routeParams.categoryId,
                title : 'Category ' + $routeParams.categoryId,
                type : 'link',
                priority : 10,
                visible : true,
                url : 'categories/' + $routeParams.categoryId,
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    /*
     * Tags
     */
    .when('/sdp/tags', {
        controller : 'SdpTagsCtrl',
        templateUrl : 'views/sdp-tags.html',
        name : 'Tags',
        icon : 'label',
        groups : [ 'asset-management' ],
        navigate : true,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'tags',
                title : 'Tags',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'tags',
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    .when('/sdp/tags/new', {
        controller : 'SdpTagNewCtrl',
        templateUrl : 'views/sdp-tag-new.html',
        name : 'New tag',
        icon : 'add',
        groups : [ 'asset-management' ],
        navigate : true,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'tags',
                title : 'Tags',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'tags',
                groups : [ 'navigationPathMenu' ]
            });
            $actions.newAction({
                id : 'new-tag',
                title : 'New tag',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'tags/new',
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    .when('/sdp/tag/:tagId', {
        controller : 'SdpTagCtrl',
        templateUrl : 'views/sdp-tag.html',
        navigate : false,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions, $routeParams) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'tags',
                title : 'Tags',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'tags',
                groups : [ 'navigationPathMenu' ]
            });
            $actions.newAction({
                id : 'tag-' + $routeParams.tagId,
                title : 'Tag ' + $routeParams.tagId,
                type : 'link',
                priority : 10,
                visible : true,
                url : 'tags/' + $routeParams.tagId,
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    /*
     * Hide Collections tab
     */
    .when('/sdp/collections', {
        controller : 'AmdCollectionsCtrl',
        templateUrl : 'views/amd-collections.html',
        name : 'Collections',
        icon : 'storage',
        navigate : false,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'collections',
                title : 'Collections',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'collections',
                groups : [ 'navigationPathMenu' ]
            });
        }
    })//
    .when('/sdp/menu/:collectionId/item/:documentId', {
        controller : 'SdpEventMenuItemCtrl',
        templateUrl : 'views/sdp-event-menu-item.html',
        navigate : false,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        }
    })//
    .when('/sdp/menu/:collectionId/item/:documentId/new', {
        controller : 'SdpEventMenuItemNewCtrl',
        templateUrl : 'views/sdp-event-menu-item-new.html',
        navigate : false,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        }

    })//
    .when('/sdp/item/:collectionId/document/:documentId', {
        controller : 'AmdDocumentCtrl',
        templateUrl : 'views/sdp-event-document.html',
        navigate : false,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        }

    })//
    .when('/sdp/downloads-link', {
        controller : 'SdpDownloadedFilesLinkCtrl',
        templateUrl : 'views/sdp-downloaded-files-link.html',
        name : 'Downloaded links',
        icon : 'cloud_download',
        groups : [ 'asset-management' ],
        navigate : true,
        /*
         * @ngInject
         */
        protect : function ($rootScope) {
            return !$rootScope.__account.permissions.tenant_owner;
        },
        /*
         * @ngInject
         */
        integerate : function ($actions) {
            $actions.group('navigationPathMenu').clear();
            $actions.newAction({
                id : 'amh-sdp.downloaded-files',
                title : 'downloaded files',
                type : 'link',
                priority : 10,
                visible : true,
                url : 'downloads-link',
                groups : [ 'navigationPathMenu' ]
            });
        }
    }).otherwise('/dashboard');
});