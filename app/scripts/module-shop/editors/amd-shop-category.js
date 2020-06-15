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
@ngdoc Editors
@name /shop/categories/:categoryId
@description
Manage a shop category.

 */
mblowfish.addEditor('/shop/categories/:categoryId', {
	templateUrl: 'views/shop/category.html',
	controllerAs: 'ctrl',
	/* @ngInject */
	controller: function($editor, $scope, $state, $shop, $controller, $mbTranslate, $mbActions, $mbUtil) {
		
		var isEqualId = $mbUtil.isEqualId;
		// Extends collection controller from MbAbstractCtrl 
		angular.extend(this, $controller('MbAbstractCtrl', {
			$scope: $scope
		}));

		//-------------------------------------------------------------------------
		// Variables
		//-------------------------------------------------------------------------
		var graphqlQuery =
			'{id,name,description,thumbnail,' +
			'parent{id,name,description,thumbnail}' +
			'children{id,name,description,thumbnail}}';
		//	var categoryProductAssos = AMD_CMS_CONTENT_SP + '/' + $state.params.contentId + '/term-taxonomies';
		//	var categoryServiceAssos = AMD_CMS_CONTENT_SP + '/' + $state.params.contentId + '/term-taxonomies';

		var ctrl = this;
		var category;
		var categoryId = $state.params.categoryId;
		var children = [];
		var parent;


		//-------------------------------------------------------------------------
		// functions
		//-------------------------------------------------------------------------
		function exec(actionId, $event) {
			if (ctrl.isBusy) {
				// TODO: add warning
				return;
			}
			ctrl.isBusy = $mbActions.exec(actionId, $event)
				.finally(function() {
					delete ctrl.isBusy;
				});
			return ctrl.isBusy;
		}

		function deleteCategory($event) {
			$event.values = [category];
			return exec(AMD_SHOP_CATEGORY_DELETE_ACTION, $event)
				.then(function() {
					$editor.close();
				});
		}

		function updateCategory($event) {
			$event.values = [category];
			return exec(AMD_SHOP_CATEGORY_UPDATE_ACTION, $event);
		}

		function addChild($event) {
			$event = $event || {};
			$event.values = [{
				parent_id: category.id
			}];
			return exec(AMD_SHOP_CATEGORY_CREATE_ACTION, $event);
		}

		function deleteChild(child, $event) {
			$event.values = [child];
			return exec(AMD_SHOP_CATEGORY_DELETE_ACTION, $event);
		}

		//-------------------------------------------------------------------------
		// End
		//-------------------------------------------------------------------------
		function parsCategory(categoryData) {
			category = categoryData;
			ctrl.category = category;
		}

		function parsChildren(childrenData) {
			children = childrenData;
			ctrl.children = children;
		}

		function parsParent(parent) {
			parent = parent;
			ctrl.parent = parent;
		}

		function reload() {
			ctrl.isBusy = $shop
				.getCategory(categoryId, {
					graphql: graphqlQuery,
				})//
				.then(function(categoryData) {
					var childrenData = categoryData.children || [];
					var parentData = categoryData.parent || {};

					delete categoryData.children;
					delete categoryData.parent;

					parsCategory(categoryData);
					parsChildren(childrenData);
					parsParent(parentData);
				}, function() {
					alert($mbTranslate.instant('Failed to load the category.'));
				})//
				.finally(function() {
					delete ctrl.isBusy;
				});
			return ctrl.isBusy;

		}

		ctrl.addEventHandler(AMD_SHOP_CATEGORY_SP, function(event) {
			if (!category) {
				return;
			}
			_.forEach(event.values, function(value) {
				if (isEqualId(value.id, category.id)) {
					switch (event.key) {
						case 'create':
						case 'update':
							_.assign(content, value);
							break;
						case 'delete':
							$editor.close();
							break;
					}
				}
				if (isEqualId(value.id, category.parent_id)) {
					switch (event.key) {
						case 'create':
						case 'update':
							_.assign(parent, value);
							break;
						case 'delete':
							$editor.close();
							break;
					}
				}
				if (isEqualId(value.parent_id, category.id)) {
					switch (event.key) {
						case 'create':
						case 'update':
							var findItem = _.chain(children)
								.filter({ id: value.id })
								.map(function(item) {
									return _.assign(item, value);
								})
								.value();
							if (_.isEmpty(findItem)) {
								children.unshift(value);
							}
							break;
						case 'delete':
							children = _.remove(children, { id: value.id });
							break;
					}
				}
			});
		});

		_.assign(ctrl, {

			isBusy: false,
			isCategoryBusy: false,
			isSubcategoryBusy: false,

			children: children,
			parent: parent,
			category: category,


			deleteCategory: deleteCategory,
			updateCategory: updateCategory,

			addChild: addChild,
			deleteChild: deleteChild,
		});

		reload();
	}
});

