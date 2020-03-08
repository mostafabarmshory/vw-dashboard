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


/**
 * @ngdoc controller
 * @name AmdSeoLinksCtrl
 * @description Manages view of SEO links
 */
angular.module('ngMaterialDashboardSeo').controller('AmdSeoLinksCtrl', function($scope, $navigator, $seo, QueryParameter, $controller) {

	// Extends with ItemsController
	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	}));

    /*
     * Overried the function
     */
	this.getModelSchema = function() {
		return $seo.linkSchema();
	};

	// get seo links
	this.getModels = function(parameterQuery) {
		return $seo.getLinks(parameterQuery);
	};

	// get a seo link
	this.getModel = function(id) {
		return $seo.getLink(id);
	};

	// delete seo link
	this.deleteModel = function(item) {
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
	this.addLink = function() {
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
		action: function() {
			ctrl.addLink();
		}
	}]);
});
