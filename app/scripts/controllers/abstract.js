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

/**
@ngdoc Controllers
@name MbSeenAbstractCollectionCtrl
@description Generic controller of model collection of seen

This controller is used manages a collection of a virtual items. it is the
base of all other collection controllers such as accounts, groups, etc.

There are two types of function in the controller: view and data related. All
data functions are considered to be override by extensions.

There are three categories of actions;

- view
- model
- controller

view actions are about to update view. For example adding an item into the view
or remove deleted item.

Model actions deal with model in the repository. These are equivalent to the view
actions but removes items from the storage.

However, controller function provide an interactive action to the user to performs
an action.

## Add

- addItem: controller
- addModel: model
- addViewItem: view
 */
mblowfish.controller('SeenAbstractCtrl', function($scope, $controller, $q) {


	/*
	 * Extends collection controller from MbAbstractCtrl 
	 */
	angular.extend(this, $controller('MbAbstractCtrl', {
		$scope: $scope
	}));

	this.getSchema = function() {
		if (!angular.isDefined(this.getModelSchema)) {
			return;
		}
		return this.getModelSchema()
			.then(function(schema) {
				return schema;
			});
	};

	//properties is the children of schema.
	this.getProperties = function() {
		if (angular.isDefined(this.properties)) {
			$q.resolve(this.properties);
		}
		var ctrl = this;
		if (angular.isDefined(ctrl.getModelSchema)) {
			return this.getSchema()
				.then(function(schema) {
					ctrl.properties = schema.children;
				});
		}
	};

	this.init = function() {
		this.getProperties();
	};
});
