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
'use strict';

angular.module('ngMaterialDashboardSeo')
/**
 * 
 */
.config(function ($routeProvider) {
    $routeProvider
    /**
     * @ngdoc ngRoute
     * @name /seo/backends
     * @description List of SEO backends
     * 
     */
    .when('/seo/backends', {
        controller: 'AmdSeoBackendsCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'views/amd-seo-backends.html',
        navigate: true,
        groups: ['seo'],
        name: 'Prerender backends',
        icon: 'dvr',
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        }
    })
    /**
     * @ngdoc ngRoute
     * @name /seo/backends/new
     * @description Adding new SEO backend
     * 
     */
    .when('/seo/backends/new', {
        controller: 'AmdSeoBackendNewCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'views/amd-seo-backend-new.html',
        navigate: true,
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        },
        groups: ['seo'],
        name: 'New prerender backend',
        icon: 'add'
    })
    /**
     * @ngdoc ngRoute
     * @name /seo/backends/:id
     * @description List of seo backend
     * 
     */
    .when('/seo/backends/:id', {
        controller: 'AmdSeoBackendCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'views/amd-seo-backend.html',
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        }
    })

    /**
     * @ngdoc ngRoute
     * @name /seo/links
     * @description List of links
     * 
     */
    .when('/seo/links', {
        controller: 'AmdSeoLinksCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'views/amd-seo-links.html',
        navigate: true,
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        },
        groups: ['seo'],
        name: 'Sitemap links',
        icon: 'link'
    })
    /**
     * @ngdoc ngRoute
     * @name /seo/links/new
     * @description Adding new link to SEO
     * 
     * Links are used in seo engine, site map generator and etc.
     * 
     */
    .when('/seo/links/new', {
        controller: 'AmdSeoLinkNewCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'views/amd-seo-link-new.html',
        navigate: true,
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        },
        groups: ['seo'],
        name: 'New sitemap link',
        icon: 'add'
    })
    /**
     * @ngdoc ngRoute
     * @name /seo/links/:id
     * @description Link details
     * 
     */
    .when('/seo/links/:id', {
        controller: 'AmdSeoLinkCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'views/amd-seo-link.html',
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        }
    })
    /**
     * @ngdoc ngRoute
     * @name /seo/sitemap
     * @description seo sitemap
     * 
     */
    .when('/seo/sitemap', {
        templateUrl: 'views/sitemap.html',
        navigate: true,
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        },
        groups: ['seo'],
        name: 'View Sitemap',
        icon: 'public'
    })
    /**
     * @ngdoc ngRoute
     * @name /seo/crawled-links
     * @description List of links visited by crawlers
     * 
     */
    .when('/seo/crawled-links', {
        templateUrl: 'views/amd-seo-crawled-links.html',
        controller: 'AmdSeoCrawledLinksCtrl',
        controllerAs: 'ctrl',
        navigate: true,
        /*
         * @ngInject
         */
        protect: function ($rootScope) {
            return !$rootScope.app.user.tenant_owner;
        },
        groups: ['seo'],
        name: 'Crawled links',
        icon: 'public'
    })
    /**
     * @ngdoc ngRoute
     * @name /seo/crawled-links/:crawledLinkId/render
     * @description A render of a crawled link in a page
     * 
     */
    .when('/seo/crawled-links/:crawledLinkId/render', {
        templateUrl: 'views/amd-seo-content-render.html',
//      controller: 'AmdSeoContentRenderCtrl',
//      controllerAs: 'ctrl'
    });
});