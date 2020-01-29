'use strict';
angular.module('ngMaterialDashboardSeo')

/**
 * @ngdoc controller
 * @name AmdSeoLinksCtrl
 * @description Manages view of SEO links
 */
.controller('AmdSeoLinksCtrl', function ($scope, $navigator, $seo, QueryParameter, $controller) {

    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope: $scope
    }));

    /*
     * Overried the function
     */
    this.getModelSchema = function () {
        return $seo.linkSchema();
    };

    // get seo links
    this.getModels = function (parameterQuery) {
        return $seo.getLinks(parameterQuery);
    };

    // get a seo link
    this.getModel = function (id) {
        return $seo.getLink(id);
    };

    // delete seo link
    this.deleteModel = function (item) {
        return item.delete();
    };

    this.init({
        eventType: '/seo/links'
    });

    /**
     * To add a new link
     * 
     * @returns
     */
    this.addLink = function () {
        $navigator.openPage('seo/links/new');
    };

    this.sortKeys = [
        'title',
        'description',
        'loc',
        'lastmod',
        'priority'
        ];

    var ctrl = this;
    this.addActions([{
        title: 'New link',
        icon: 'add',
        action: function () {
            ctrl.addLink();
        }
    }]);
});