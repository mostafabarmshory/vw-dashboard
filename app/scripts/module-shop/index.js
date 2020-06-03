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

mblowfish.config(function($mbResourceProvider, $mbViewProvider, $mbEditorProvider, $mbIconProvider, $mbActionsProvider) {

	var shopActionGroups = ['Shop'];
	var shopViewGroups = ['Shop'];

	$mbIconProvider
		.addShapes({
			'shop-zone': '<path id="path2" d="M 23,7 V 1 H 17 V 3 H 7 V 1 H 1 V 7 H 3 V 17 H 1 v 6 h 6 v -2 h 10 v 2 h 6 V 17 H 21 V 7 Z M 3,3 H 5 V 5 H 3 Z M 5,21 H 3 V 19 H 5 Z M 17,19 H 7 V 17 H 5 V 7 H 7 V 5 h 10 v 2 h 2 v 10 h -2 z m 4,2 h -2 v -2 h 2 z M 19,5 V 3 h 2 v 2 z" /><path id="path4" fill="none" d="M0 0h24v24H0z" />'
		});


	$mbViewProvider
		.addView('/shop/categories', {
			title: 'Categories',
			icon: 'folder_special',
			templateUrl: 'views/amd-shop-categories.html',
			groups: shopViewGroups,
		})
		.addView('/shop/agencies', {
			title: 'Agencies',
			icon: 'store',
			templateUrl: 'views/amd-shop-agencies.html',
			groups: shopViewGroups,
		})
		.addView('/shop/products', {
			title: 'Products',
			templateUrl: 'views/amd-shop-products.html',
			icon: 'add_shopping_cart',
			groups: shopViewGroups,
		})
		.addView('/shop/services', {
			title: 'Services',
			templateUrl: 'views/amd-shop-services.html',
			icon: 'cloud_upload',
			groups: shopViewGroups,
		})
		.addView('/shop/orders', {
			templateUrl: 'views/amd-shop-orders.html',
			name: 'Orders',
			icon: 'event',
			groups: shopViewGroups,
		})//
		.addView('/shop/orders/board', {
			title: 'Orders Board',
			icon: 'dashboard',
			templateUrl: 'views/amd-shop-orders-board.html',
			groups: shopViewGroups,
		})//
		.addView('/shop/tags', {
			title: 'Tags',
			icon: 'label',
			templateUrl: 'views/amd-shop-tags.html',
			groups: shopViewGroups,
		})
		.addView('/shop/delivers', {
			title: 'Delivers',
			icon: 'local_shipping',
			templateUrl: 'views/amd-shop-delivers.html',
			groups: shopViewGroups,
		})
		.addView('/shop/zones', {
			title: 'Zones',
			icon: 'layers',
			templateUrl: 'views/amd-shop-zones.html',
			groups: shopViewGroups,
		});



	$mbEditorProvider
		.addEditor('/shop/agencies/:itemId', {
			templateUrl: 'views/amd-shop-agency.html',
		})
		.addEditor('/shop/categories/:categoryId', {
			templateUrl: 'views/amd-shop-category.html',
		})
		.addEditor('/shop/products/:productId', {
			templateUrl: 'views/amd-shop-product.html',
		})//
		.addEditor('/shop/services/:serviceId', {
			templateUrl: 'views/amd-shop-service.html',
		})
		.addEditor('/shop/tags/:tagId', {
			templateUrl: 'views/amd-shop-tag.html',
		})
		.addEditor('/shop/orders/:orderId', {
			controller: 'AmdShopOrderCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-shop-order.html',
		})//
		.addEditor('/shop/delivers/:deliverId', {
			controller: 'AmdShopDeliverCtrl',
			templateUrl: 'views/amd-shop-deliver.html',
		})
		.addEditor('/shop/zones/:zoneId', {
			templateUrl: 'views/amd-shop-zone.html',
		});






	// Resource for list of shop categories
	$mbResourceProvider
		.addPage('/shop/categories', {
			label: 'Categories',
			templateUrl: 'views/resources/amd-shop-categories.html',
			/*
			 * @ngInject
			 */
			controller: function($scope) {
				// TODO: maso, 2018: load selected item
				$scope.multi = true;
				this.value = $scope.value;
				this.items = {};
				this.setSelected = function(item, selected) {
					if (_.isUndefined(selected)) {
						selected = true;
					}
					item._selected = selected;
					$scope.$parent.setValue(this.getSelection());
				};
				// this._setSelected = setSelected;
				this.isSelected = function(item) {
					this.items[item.id] = item;
					return item._selected;
				};
				this.getSelection = function() {
					var selection = [];
					_.forEach(this.items, function(item) {
						if (item._selected) {
							selection.push(item);
						}
					});
					return selection;
				};
			},
			controllerAs: 'resourceCtrl',
			priority: 8,
			tags: ['/shop/categories']
		})
		.addPage('/shop/zones#id', {
			label: 'Zone',
			templateUrl: 'views/resources/amd-shop-zones.html',
			/*
			 * @ngInject
			 */
			controller: function($scope) {
				// TODO: maso, 2018: load selected item
				$scope.multi = false;
				this.value = $scope.value;
				this.setSelected = function(item) {
					$scope.$parent.setValue(item.id);
					$scope.$parent.answer();
				};
				this.isSelected = function(item) {
					return item.id === this.value;
				};
			},
			controllerAs: 'resourceCtrl',
			priority: 8,
			tags: ['/shop/zones#id', 'zone_id']
		});



	//-----------------------------------------------------
	// Actions
	//-----------------------------------------------------
	$mbActionsProvider
		//>>                       Zone                             <<
		.addAction('create:/shop/zones', {
			title: 'New Category',
			icon: 'photo_album',
			description: 'Creates new category',
			/*
			 * @ngInject
			 */
			action: function(/*$event*/) {
				var job = $shop.zoneSchema()
					.then(function(schema) {
						return $navigator.openDialog({
							templateUrl: 'views/dialogs/amd-item-new.html',
							config: {
								title: 'New Zone',
								schema: schema,
								data: {}
							}
						});
					})
					.then(function(zoneData) {
						return $shop.putZone(zoneData);
					})
					.then(function(zone) {
						$dispatcher.dispatch('/shop/zones', {
							key: 'create',
							values: [zone]
						});
					}, function() {
						$window.alert($translate.instant('Failed to create new zone.'));
					});
				// TODO: maso, 2020: add the job into the job lists
				// $app.addJob('Adding new shop category', job);
				return job;
			},
			groups: shopActionGroups
		})
		.addAction('create:/shop/services', {// create new category menu
			icon: 'photo_album',
			title: 'New Deliver',
			description: 'Creates new delivers',
			/*
			 * @ngInject
			 */
			action: function(/*$event*/) {
				var job = $shop.serviceSchema()
					.then(function(schema) {
						return $navigator.openDialog({
							templateUrl: 'views/dialogs/amd-item-new.html',
							config: {
								title: 'New Service',
								schema: schema,
								data: {}
							}
						});
					})
					.then(function(itemData) {
						return $shop.putProduct(itemData);
					})
					.then(function(item) {
						$dispatcher.dispatch('/shop/services', {
							key: 'create',
							values: [item]
						});
					}, function() {
						$window.alert($translate.instant('Failed to create a new service.'));
					});
				// TODO: maso, 2020: add the job into the job lists
				// $app.addJob('Adding new shop category', job);
				return job;
			},
			groups: shopActionGroups
		})
		.addAction('create:/shop/products', {// create new category menu
			icon: 'photo_album',
			title: 'New Product',
			/* @ngInject */
			action: function(/*$event*/) {
				var job = $shop.productSchema()
					.then(function(schema) {
						return $navigator.openDialog({
							templateUrl: 'views/dialogs/amd-item-new.html',
							config: {
								title: 'New Product',
								schema: schema,
								data: {}
							}
						});
					})
					.then(function(productData) {
						return $shop.putProduct(productData);
					})
					.then(function(product) {
						$mbDispatcher.dispatch('/shop/products', {
							key: 'create',
							values: [product]
						});
					}, function() {
						$window.alert($translate.instant('Failed to create a new product.'));
					});
				// TODO: maso, 2020: add the job into the job lists
				// $app.addJob('Adding new shop category', job);
				return job;
			},
			groups: shopActionGroups
		})
		.addAction('create:/shop/delivers', {// create new category menu
			priority: 10,
			icon: 'photo_album',
			title: 'New Deliver',
			description: 'Creates new delivers',
			/* @ngInject */
			action: function($event) {
				$window.alert('Not supported');
			},
			groups: shopActionGroups
		})
		.addAction('create:/shop/delivers', {// create new category menu
			title: 'New Deliver',
			icon: 'photo_album',
			description: 'Creates new delivers',
			/* @ngInject */
			action: function($event) {
				var job = $navigator.openDialog({
					templateUrl: 'views/dialogs/amd-shop-deliver-new.html',
					config: {}
				})
					.then(function(deliverData) {
						return $shop.putDeliver(deliverData);
					})
					.then(function(deliver) {
						$dispatcher.dispatch('/shop/delivers', {
							key: 'create',
							values: [deliver]
						});
					}, function() {
						$window.alert($translate.instant('Failed to create new deliver.'));
					});
				// TODO: maso, 2020: add the job into the job lists
				// $app.addJob('Adding new shop deliver', job);
				return job;
			},
			groups: shopActionGroups
		})
		.addAction('create:/shop/categories', {// create new category menu
			priority: 10,
			icon: 'photo_album',
			title: 'New Category',
			description: 'Creates new category',
			/* @ngInject */
			action: function($event) {
				var job = $navigator.openDialog({
					templateUrl: 'views/dialogs/amd-shop-category-new.html',
					config: {}
				})
					.then(function(newConfig) {
						newConfig.parent_id = $event.parent_id;
						return $shop.putCategory(newConfig);
					})
					.then(function(cat) {
						$dispatcher.dispatch('/shop/categories', {
							key: 'create',
							values: [cat]
						});
					}, function() {
						$window.alert($translate.instant('Failed to create new category.'));
					});
				// TODO: maso, 2020: add the job into the job lists
				// $app.addJob('Adding new shop category', job);
				return job;
			},
			groups: shopActionGroups
		})
		.addAction('create:/shop/agencies', {
			icon: 'store',
			title: 'New Agency',
			description: 'Creates new agency in shop domain',
			/*
			 * @ngInject
			 */
			action: function(/*$event*/) {
				var job = $shop.agencySchema()
					.then(function(schema) {
						return $navigator.openDialog({
							templateUrl: 'views/dialogs/amd-item-new.html',
							config: {
								title: 'New Agency',
								schema: schema,
								data: {}
							}
						});
					})
					.then(function(itemData) {
						return $shop.putAgency(itemData);
					})
					.then(function(item) {
						$dispatcher.dispatch('/shop/agencies', {
							key: 'create',
							values: [item]
						});
					}, function() {
						$window.alert($translate.instant('Failed to create a new agency.'));
					});
				// TODO: maso, 2020: add the job into the job lists
				// $app.addJob('Adding new shop category', job);
				return job;
			},
			groups: shopActionGroups
		})
})