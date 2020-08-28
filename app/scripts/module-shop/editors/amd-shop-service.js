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
@name /shop/services/:serviceId
@description 
Controller of a service
 */
mblowfish.addEditor('/shop/services/:serviceId', {
	templateUrl: 'views/shop/editors/service.html',
	controllerAs: 'ctrl',
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: function(
		$scope, $state, $mbTranslate, $location, $navigator, $q,
        /* wb-core   */ $mbResource,
        /* seen-shop */ $shop, ShopService, ShopCategory, ServiceMetafield) {
		'ngInject';

		this.loading = false;
		this.updating = false;
		this.edit = false;
		this.loadingMetas = false;
		this.loadingCategories = false;
		var ctrl = this;

		/**
		 * @name loadService
		 * @memberOf AmdShopServiceCtrl
		 * @description Load the selected service
		 */
		function loadService() {
			if (ctrl.loading) {
				return;
			}
			ctrl.loading = true;
			$shop.getService($state.params.serviceId, {
				graphql: '{id,title,description,price,off,avatar,categories{id,name,description,thumbnail}, metafields{id,key,value,unit,namespace}}'
			})//
				.then(function(p) {
					loadMetafields(p.metafields);
					loadCategories(p.categories);
					delete p.metafields;
					delete p.categories;
					$scope.service = new ShopService(p);
				}, function() {
					alert($mbTranslate.instant('Faild to load the service.'));
				})//
				.finally(function() {
					ctrl.loading = false;
				});
		}

		/**
		 * @name remove
		 * @memberOf AmdShopServiceCtrl
		 * @description remove the selected service from the server
		 */
		function remove() {
			confirm($mbTranslate.instant('Item will be deleted. There is no undo action.'))//
				.then(function() {
					return $scope.service.delete()//
						.then(function() {
							$location.path('/services/');
						}, function() {
							alert($mbTranslate.instant('Fail to delete the service.'));
						});
				});
		}

		/**
		 * @name update
		 * @memberOf AmdShopServiceCtrl
		 * @description Update the selected service
		 */
		function update() {
			if (ctrl.loading) {
				return ctrl.loading;
			}
			ctrl.loading = $scope.service.update()//
				.then(function(newService) {
					$scope.service = newService;
				}, function() {
					alert($mbTranslate.instant('Failed to update service.'));
				})//
				.finally(function() {
					ctrl.loading = false;
				});
			return ctrl.loading;
		}

		/**
		 * @name loadMetas
		 * @memberOf AmdShopProductCtrl
		 * @description Load the metadatas of the service
		 */
		function loadMetafields(list) {
			var metaFields = [];
			_.forEach(list, function(item) {
				metaFields.push(new ServiceMetafield(item));
			});
			$scope.metafeilds = metaFields;
		}

		/*
		 * Load categories the service belongs to.
		 */
		function loadCategories(list) {
			var categories = [];
			_.forEach(list, function(item) {
				categories.push(new ShopCategory(item));
			});
			$scope.categories = categories;
		}

		/**
		 * @name removeMetaField
		 * @memberOf AmdShopProductCtrl
		 * @description Remove a metadata from the metadatas of the service
		 * @param {type}
		 *            metaData
		 */
		function removeMetafield(metaData) {
			confirm($mbTranslate.instant('Item will be deleted. There is no undo action.'))//
				.then(function() {
					return $scope.service.deleteMetafield(metaData)//
						.then(function() {
							loadMetafields();
							toast($mbTranslate.instant('Item is deleted successfully.'));
						}, function() {
							alert($mbTranslate.instant('Failed to delete item.'));
						});
				});
		}

		function addMetafield(metadata) {
			var mydata = metadata ? metadata : {};
			$navigator.openDialog({
				templateUrl: 'views/dialogs/metafield-new.html',
				config: {
					data: mydata
				}
				// Create content
			}).then(function(meta) {
				return $scope.service.putMetafield(meta)//
					.then(function() {
						loadMetafields();
					}, function() {
						alert($mbTranslate.instant('Failed to add new item.'));
					});
			});
		}

		function updateMetafield(metadata) {
			$navigator.openDialog({
				templateUrl: 'views/dialogs/metafield-update.html',
				config: {
					data: metadata
				}
				// Create content
			}).then(function(meta) {
				return $scope.service.putMetafield(meta)//
					.then(function() {
						loadMetafields();
					}, function() {
						alert($mbTranslate.instant('Failed to update item.'));
					});
			});
		}

		function inlineUpdateMetafield(metadata) {
			return $scope.service.putMetafield(metadata)//
				.then(function() {
					loadMetafields();
				}, function() {
					alert($mbTranslate.instant('Failed to update item.'));
				});
		}

		/*
		 * Assign some categories to the service.
		 */
		function selectCategories() {
			$mbResource
				.get(AMD_SHOP_CATEGORY_SP, {
					// TODO: maso, 2020: add initial resources
				})
				.then(addCategories);
		}

		/*
		 * @param {type} cats
		 * @returns {undefined}
		 * @description Push the service's categories to the server
		 */
		function addCategories(cats) {
			$scope.updatingCategories = true;
			var jobs = [];
			_.forEach(cats, function(item) {
				jobs.push($scope.service.putCategory(item)
					.then(function() {
						$scope.categories.push(item);
					}));
			});
			return $q.all(jobs)
				.finally(function() {
					$scope.updatingCategories = false;
				});
		}

		this.removeCategories = function() {
			$scope.updatingCategories = true;
			var jobs = [];
			_.forEach(arguments, function(item) {
				jobs.push($scope.service.deleteCategory(item)
					.then(function() {
						_.remove($scope.categories, function(currentObject) {
							return currentObject.id === item.id;
						});
					}));
			});
			return $q.all(jobs)
				.finally(function() {
					$scope.updatingCategories = false;
				});
		};


		/*
		 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
		 */
		$scope.remove = remove;
		$scope.update = update;
		$scope.removeMetafield = removeMetafield;
		$scope.addMetafield = addMetafield;
		$scope.updateMetafield = updateMetafield;
		$scope.inlineUpdateMetafield = inlineUpdateMetafield;
		$scope.selectCategories = selectCategories;

		loadService();
	}
});

