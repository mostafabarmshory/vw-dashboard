'use strict';

angular.module('ngMaterialDashboardCms')

/**
 * @ngdoc function
 * @name ngMaterialDashboard.controller:ContentsCtrl
 * @description # ContentsCtrl Controller of the ngMaterialDashboard
 */
.controller('AmdContentsCtrl', function ($scope, $usr, $controller, $navigator) {
    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenCmsContentsCtrl', {
        $scope: $scope
    }));
    this.addAction({
        title: 'New content',
        icon: 'add',
        action: function () {
            $navigator.openPage('/contents/new');
        }
    });
    this.init();
});
