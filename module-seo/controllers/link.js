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
 * @name AmdSeoLinkCtrl
 * @description Manages a link in SEO domain
 * 
 * The Controller of the a link.
 */
angular.module('ngMaterialDashboardSeo').controller('AmdSeoLinkCtrl', function(
	/* AngularJS */ $scope, $controller,
	/* seen-seo  */ $seo) {


	/*
	 * Extends collection controller from MbAbstractCtrl 
	 */
	angular.extend(this, $controller('MbSeenAbstractItemCtrl', {
		$scope: $scope
	}));


	// -------------------------------------------------------------------------
	// Model
	//
	// We suppose that all model action be override by the new controllers.
	//
	// -------------------------------------------------------------------------
	this.deleteModel = function(item) {
		return $seo.deleteLink(item.id);
	};
	
	this.getModelSchema = function() {
		return $seo.linkSchema();
	};

	this.getModel = function(id) {
		return $seo.getLink(id);
	};

	this.updateModel = function(model) {
		return model.update();
	};

	// Loads the controller
	this.init({
		eventType: '/seo/links',
		confirmation: true,
//		dataQuery: '{id, name, title}', 
//		modelId: $routeParam.modelId,
	});


});