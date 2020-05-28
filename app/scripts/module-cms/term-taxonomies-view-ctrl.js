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
@ngdoc Controllers
@name AmdCmsTermTaxonomiesCtrl
@description # Manages Term-Taxonomies
 */
mblowfish.controller('AmdCmsTermTaxonomiesCtrl', function($scope, $cms, $controller) {

	/*
	 * Extends collection controller
	 */
	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	}));

	// Override the schema function
	this.getModelSchema = function() {
		return $cms.termTaxonomySchema();
	};

	// get models
	this.getModels = function(parameterQuery) {
		return $cms.getTermTaxonomies(parameterQuery);
	};

	// get a model
	this.getModel = function(id) {
		return $cms.getTermTaxonomy(id);
	};

	// add a model
	this.addModel = function(model) {
		return $cms.putTermTaxonomy(model);
	};

	// delete model
	this.deleteModel = function(model) {
		return $cms.deleteTermTaxonomy(model.id);
	};


	/*
	 * init ctrl
	 */
	this.init({
		eventType: '/term-taxonomies',
		addAction: {
			title: 'New term-taxonomy',
			icon: 'add',
			dialog: 'views/dialogs/amd-term-taxonomy-new.html'
		},
		deleteAction: {
			title: 'Delete term-taxonomy?'
		},
		actions: []
	});
});
