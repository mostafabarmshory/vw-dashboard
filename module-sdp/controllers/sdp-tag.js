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

angular.module('ngMaterialDashboardSdp')

/**
 * @ngdoc function
 * @name saasdmCpanelApp.controller:SdpTagCtrl
 * @description # SdpTagCtrl Controller of the saasdmCpanelApp
 */
.controller('SdpTagCtrl', function($scope, $sdp, $navigator, $state, $location, $translate) {

    var ctrl = {
        loadingTag : true,
        savingTag : false,
        items: [],
        childs: [],
        edit: false
    };
    var tag;

    function handlError(){
        alert($translate.instant('faile to load asset'));
    }
    
    /**
     * دسته مورد نظر را از سیستم حذف می‌کند.
     * 
     * @param request
     * @returns
     */
    function remove() {
        confirm('delete tag ' + $scope.tag.id +'?')//
        .then(function(){
            return $scope.tag.delete();//
        })//
        .then(function(){
            // TODO: maso, 1395: go to the model page
            $location.path('/tags');
        }, function(error){
            alert('fail to delete tag:' + error.message);
        });
    }

    function save(){
        ctrl.savingTag = true;
        tag.update()//
        .then(function(){
            ctrl.edit=false;
            ctrl.savingTag = false;
        });
    }

    /*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
     */
    $scope.remove = remove;
    $scope.save = save;

    $scope.ctrl = ctrl;

    function load(){        
        // Load tag
        return $sdp.getTag($state.params.tagId)//
        .then(function(a){
            tag = a;
            $scope.tag = a;
            ctrl.loadingTag = false;
            return a;
        }, handlError);
    }

    load();
    
});

