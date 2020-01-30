  /* jslint todo: true */
  /* jslint xxx: true */
  /* jshint -W100 */
  'use strict';

  angular.module('ngMaterialDashboardSdp')

          /**
           * @ngdoc directive
           * @name amhSdp.directive:sdpAssetFilter
           * @description # sdpAssetFilter
           */
          .directive('sdpDownloadedLink', function () {
              return {
                  restrict: 'E',
                  templateUrl: 'views/directives/sdp-downloaded-link.html',
                  scope: {
                      item: '='
                  },
                  controller: function ($scope, /*$sdp, */$usr) {
//                      $sdp.asset($scope.item.asset)//
//                              .then(function (asset) {
//                                  $scope.fileName = asset.name;
//                              });//
                      $usr.getAccount($scope.item.user)//
                              .then(function (user) {
                                  $scope.user = user;
                              });//
                  }
              };
          });

