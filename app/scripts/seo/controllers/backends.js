/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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
	 * @ngdoc controller
	 * @name AmdSeoBackendsCtrl
	 * @description # AmdSeoBackendsCtrl Controller of the ngMaterialDashboardSeo
	 */
	.controller('AmdSeoBackendsCtrl', function ($scope, $navigator, $seo, $controller) {

	    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	    }));

	    // Overried the function
	    this.getModelSchema = function () {
		return $seo.backendSchema();
	    };

	    // get groups
	    this.getModels = function (parameterQuery) {
		return $seo.getBackends(parameterQuery);
	    };

	    // get a group
	    this.getModel = function (id) {
		return $seo.getBackend(id);
	    };

	    // Add group
	    this.addModel = function (model) {
		return $seo.putBackend(model);
	    };

	    // delete group
	    this.deleteModel = function (model) {
		return $seo.deleteBackend(model.id);
	    };

	    this.init({
		eventType: '/seo/backends'
	    });

	    /**
	     * To add a new backend
	     * 
	     * @returns
	     */
	    this.addBackend = function () {
		$navigator.openPage('seo/backends/new');
	    };

	    var ctrl = this;
	    this.addActions([{
		    title: 'New backend',
		    icon: 'add',
		    action: function () {
			ctrl.addBackend();
		    }
		}]);

	});