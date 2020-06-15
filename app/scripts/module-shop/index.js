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

mblowfish.addConstants({
	AMD_SHOP_AGENCY_SP:   '/shop/agencies',
	AMD_SHOP_CATEGORY_SP: '/shop/categories',
	AMD_SHOP_DELIVER_SP:  '/shop/delivers',
	AMD_SHOP_PRODUCT_SP:  '/shop/products',
	AMD_SHOP_SERVICE_SP:  '/shop/services',
	AMD_SHOP_ZONE_SP:     '/shop/zones',
	AMD_SHOP_TAG_SP:      '/shop/tags',

	AMD_SHOP_AGENCY_DELETE_ACTION: 'amd.shop.agency.delete',
	AMD_SHOP_AGENCY_CREATE_ACTION: 'amd.shop.agency.create',
	AMD_SHOP_AGENCY_UPDATE_ACTION: 'amd.shop.agency.update',

	AMD_SHOP_CATEGORY_DELETE_ACTION: 'amd.shop.category.delete',
	AMD_SHOP_CATEGORY_CREATE_ACTION: 'amd.shop.category.create',
	AMD_SHOP_CATEGORY_UPDATE_ACTION: 'amd.shop.category.update',

	AMD_SHOP_DELIVER_DELETE_ACTION: 'amd.shop.deliver.delete',
	AMD_SHOP_DELIVER_CREATE_ACTION: 'amd.shop.deliver.create',
	AMD_SHOP_DELIVER_UPDATE_ACTION: 'amd.shop.deliver.update',

	AMD_SHOP_PRODUCT_DELETE_ACTION: 'amd.shop.product.delete',
	AMD_SHOP_PRODUCT_CREATE_ACTION: 'amd.shop.product.create',
	AMD_SHOP_PRODUCT_UPDATE_ACTION: 'amd.shop.product.update',

	AMD_SHOP_SERVICE_DELETE_ACTION: 'amd.shop.service.delete',
	AMD_SHOP_SERVICE_CREATE_ACTION: 'amd.shop.service.create',
	AMD_SHOP_SERVICE_UPDATE_ACTION: 'amd.shop.service.update',

	AMD_SHOP_TAG_DELETE_ACTION: 'amd.shop.tag.delete',
	AMD_SHOP_TAG_CREATE_ACTION: 'amd.shop.tag.create',
	AMD_SHOP_TAG_UPDATE_ACTION: 'amd.shop.tag.update',

	AMD_SHOP_ZONE_DELETE_ACTION: 'amd.shop.zone.delete',
	AMD_SHOP_ZONE_CREATE_ACTION: 'amd.shop.zone.create',
	AMD_SHOP_ZONE_UPDATE_ACTION: 'amd.shop.zone.update',
});

mblowfish.config(function($mbResourceProvider, $mbViewProvider, $mbEditorProvider, $mbIconProvider, $mbActionsProvider) {

	var shopViewGroups = ['Shop'];

	$mbIconProvider
		.addShapes({
			'shop-zone': '<path id="path2" d="M 23,7 V 1 H 17 V 3 H 7 V 1 H 1 V 7 H 3 V 17 H 1 v 6 h 6 v -2 h 10 v 2 h 6 V 17 H 21 V 7 Z M 3,3 H 5 V 5 H 3 Z M 5,21 H 3 V 19 H 5 Z M 17,19 H 7 V 17 H 5 V 7 H 7 V 5 h 10 v 2 h 2 v 10 h -2 z m 4,2 h -2 v -2 h 2 z M 19,5 V 3 h 2 v 2 z" /><path id="path4" fill="none" d="M0 0h24v24H0z" />'
		});


	$mbViewProvider
		.addView('/shop/services', {
			title: 'Services',
			icon: 'cloud_upload',
			templateUrl: 'views/amd-shop-services.html',
			controller: 'MbSeenShopServicesCtrl',
			controllerAs: 'ctrl',
			groups: shopViewGroups,
		})
		.addView('/shop/orders', {
			title: 'Orders',
			icon: 'event',
			templateUrl: 'views/amd-shop-orders.html',
			controller: 'MbSeenShopOrdersCtrl',
			controllerAs: 'ctrl',
			groups: shopViewGroups,
		})//
		.addView('/shop/orders-board', {
			title: 'Orders Board',
			icon: 'dashboard',
			templateUrl: 'views/amd-shop-orders-board.html',
			controller: 'MbSeenShopOrdersBoardCtrl',
			controllerAs: 'ctrl',
			groups: shopViewGroups,
		})//
		.addView('/shop/tags', {
			title: 'Tags',
			icon: 'label',
			templateUrl: 'views/amd-shop-tags.html',
			controller: 'MbSeenShopTagsCtrl',
			controllerAs: 'ctrl',
			groups: shopViewGroups,
		})
		.addView('/shop/zones', {
			title: 'Zones',
			icon: 'layers',
			templateUrl: 'views/amd-shop-zones.html',
			controller: 'MbSeenShopZonesCtrl',
			controllerAs: 'ctrl',
			groups: shopViewGroups,
		});



	$mbEditorProvider
		.addEditor('/shop/services/:serviceId', {
			templateUrl: 'views/amd-shop-service.html',
			controller: 'AmdShopServiceCtrl',
			controllerAs: 'ctrl'
		})
		.addEditor('/shop/tags/:tagId', {
			templateUrl: 'views/amd-shop-tag.html',
			controller: 'AmdShopTagCtrl',
			controllerAs: 'ctrl'
		})
		.addEditor('/shop/orders/:orderId', {
			controller: 'AmdShopOrderCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-shop-order.html',
		})//
		.addEditor('/shop/zones/:zoneId', {
			templateUrl: 'views/amd-shop-zone.html',
			controller: 'AmdShopZoneCtrl',
			controllerAs: 'ctrl'
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

});