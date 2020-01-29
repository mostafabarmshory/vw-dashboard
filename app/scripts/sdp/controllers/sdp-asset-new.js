'use strict';

angular.module('ngMaterialDashboardSdp')

/**
 * @ngdoc controller
 * @name AmdContentNewCtrl
 * @description Mange content new
 */
.controller('SdpAssetNewCtrl', function ($scope, $sdp, $navigator) {

    var ctrl = {
        saving : false
    };

    function cancel() {
        $navigator.openPage('sdp/assets');
    }

    function add(conf) {
        ctrl.saving = true;
        var data = conf.model;
        $sdp.putAsset(data)//
        .then(function(asset){
            if(conf.files[0]){
                var file = conf.files[0].lfFile;
                return asset.uploadContent(file);                
            }
            return asset;
        })//
        .then(function(obj) {
            $navigator.openPage('sdp/asset/' + obj.id);
        }, function () {
            alert('Fail to create new asset.');
        })//
        .finally(function(){
            ctrl.saving = false;
        });
    }

    $scope.cancel = cancel;
    $scope.add = add;
    $scope.ctrl = ctrl;
});
