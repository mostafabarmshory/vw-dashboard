/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
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

/**
 * @ngdoc function
 * @name ngMaterialDashboard.controller:GroupsCtrl
 * @description # GroupsCtrl Controller of the ngMaterialDashboard
 */
mblowfish.controller('amdSpasCtrl', function ($scope, $tenant, $navigator, $controller) {

    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope: $scope
    }));

    /*
     * Overried the function
     */
    this.getModelSchema = function () {
        return $tenant.spaSchema();
    };

    // get spas
    this.getModels = function (parameterQuery) {
        return $tenant.getSpas(parameterQuery);
    };

    // get a spa
    this.getModel = function (id) {
        return $tenant.getSpa(id);
    };

    // delete spa
    this.deleteModel = function (item) {
        return item.delete();
    };

    this.init({
        eventType: '/spas'
    });

    /**
     * add an spa
     */
    this.addSpa = function () {
        $navigator.openPage('spas/upload');
    };

    /**
     * Add an spa from repository
     */
    this.addSpaFromRepo = function () {
        $navigator.openPage('spas/repository');
    };

    this.sortKeys = ['id', 'creation_dtime'];

    var ctrl = this;
    this.addActions([{
        title: 'Upload spa',
        icon: 'add',
        action: function () {
            ctrl.addSpa();
        }
    }, {
        title: 'Add spa from repository',
        icon: 'add',
        action: function () {
            ctrl.addSpaFromRepo();
        }
    }]);
});
