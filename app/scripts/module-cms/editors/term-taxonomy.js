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
@ngdoc function
@name ngMaterialDashboardCms.controller:AmdCmsTermTaxonomyCtrl
@description # TaxonomyCtrl Controller of the ngMaterialDashboardCms
 */
mblowfish.editor('/cms/term-taxonomies/:itemId', {
	templateUrl: 'scripts/module-cms/editors/term-taxonomy.html',
	controllerAs: 'ctrl',
	controller: function($scope, $controller, $cms) {
		'ngInject';
		
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
			return $cms.deleteTermTaxonomy(item.id);
		};

		this.getModelSchema = function() {
			return $cms.termTaxonomySchema();
		};

		this.getModel = function(id) {
			return $cms.getTermTaxonomy(id);
		};

		this.updateModel = function(model) {
			return model.update();
		};

		// Loads the controller
		this.init({
			eventType: '/cms/term-taxonomies',
			confirmation: true,
			//		dataQuery: '{id, name, title}', 
			//		modelId: $routeParam.modelId,
		});
	}
});

