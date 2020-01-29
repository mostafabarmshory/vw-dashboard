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

angular.module('ngMaterialDashboardShop')

/**
 * @ngdoc function
 * @name ngMaterialDashboardShop.controller:AmdShopTagCtrl
 * @description # TagCtrl Controller of the saasdmCpanelApp
 */
.controller('AmdShopTagCtrl', function($scope, $shop, $translate, $routeParams, $location) {

    var ctrl = {
            loading : false,
            saving : false,
            edit: false,
            items: []
    };

    function loadTag(){
        if(ctrl.loading){
            return;
        }
        ctrl.loading = true;
        $shop.getTag($routeParams.tagId)//
        .then(function(t){
            $scope.tag = t;
        }, function(){
            alert($translate.instant('Failed to load the tag.'));
        })//
        .finally(function(){
            ctrl.loading = false;
        });
    }
    
    function remove() {
        confirm($translate.instant('Item will be deleted. There is no undo action.'))//
        .then(function () {
            return $scope.tag.delete();//
        })//
        .then(function(){
            $location.path('/tags');
        }, function(){
            alert($translate.instant('Fail to delete the tag.'));
        });
    }

    function save(){
        if(ctrl.saving){
            return;
        }
        ctrl.saving = true;
        $scope.tag.update()//
        .then(function (newTag) {
            $scope.tag = newTag;
            ctrl.edit = false;
        }, function () {
            alert($translate.instant('Failed to save the tag.'));
        })//
        .finally(function(){
            ctrl.saving = false;
        });
    }

    $scope.tag = {};
    $scope.remove = remove;
    $scope.save = save;
    $scope.ctrl = ctrl;
    
    loadTag();
});

