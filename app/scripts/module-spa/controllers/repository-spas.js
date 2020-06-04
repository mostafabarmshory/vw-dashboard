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
 * 
 */
mblowfish.controller('amdReposiotrySpasCtrl', function ($scope, $controller, $navigator, $tenant) {

    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope: $scope
    }));

    /*
     * Overried the function
     */
    this.getModelSchema = function () {
        return $tenant.repositorySpaSchema();
    };

    // get spas
    this.getModels = function (parameterQuery) {
        return $tenant.getRepositorySpas(parameterQuery);
    };

    // get a spa
    this.getModel = function (id) {
        return $tenant.getRepositorySpa(id);
    };

    // delete spa
    this.deleteModel = function (item) {
        return item.delete();
    };

    this.init({
        eventType: '/spas/repository'
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

    $scope.sortKeys = ['id', 'license', 'name', 'title', 'creation_dtime'];

    this.addActions([]);
});
