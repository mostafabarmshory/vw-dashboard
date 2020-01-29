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
 * @ngdoc controller
 * @name AmdContentNewCtrl
 * @description Mange content new
 */
.controller('SdpTagNewCtrl', function($scope, $sdp, $navigator) {

    var ctrl = {
        saving : false
    };

    function cancel() {
        $navigator.openPage('/sdp/tags');
    }

    function add(conf) {
        ctrl.saving = true;
        var data = conf.model;
        $sdp.putTag(data)//
        .then(function(obj) {
            ctrl.saving = false;
            $navigator.openPage('/sdp/tag/' + obj.id);
        }, function() {
            ctrl.saving = false;
            alert('Fail to create new tag.');
        });
    }

    $scope.cancel = cancel;
    $scope.add = add;
    $scope.ctrl = ctrl;
});
