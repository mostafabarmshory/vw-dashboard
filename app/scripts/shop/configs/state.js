
angular.module('ngMaterialDashboardShop').config(function($routeProvider) {

	$routeProvider//

		/*
		 * Categories
		 */
		.when('/shop/categories', {
			templateUrl: 'views/amd-shop-categories.html',
			name: 'Categories',
			icon: 'folder_special',
			groups: ['shop-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//

		.when('/shop/categories/:categoryId', {
			templateUrl: 'views/amd-shop-category.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//

		/*
		 * Product
		 */
		.when('/shop/products', {
			templateUrl: 'views/amd-shop-products.html',
			name: 'Products',
			icon: 'add_shopping_cart',
			groups: ['shop-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//
		.when('/shop/products/:productId', {
			templateUrl: 'views/amd-shop-product.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//
		/*
		 * Service
		 */
		.when('/shop/services', {
			templateUrl: 'views/amd-shop-services.html',
			name: 'Services',
			icon: 'cloud_upload',
			groups: ['shop-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//
		.when('/shop/services/:serviceId', {
			templateUrl: 'views/amd-shop-service.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//

		/*
		 * Tags
		 */
		.when('/shop/tags', {
			templateUrl: 'views/amd-shop-tags.html',
			name: 'Tags',
			icon: 'label',
			groups: ['shop-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//
		.when('/shop/tags/:tagId', {
			templateUrl: 'views/amd-shop-tag.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})

		/*
		 * Orders
		 */
		.when('/shop/orders', {
			templateUrl: 'views/amd-shop-orders.html',
			name: 'Orders',
			icon: 'event',
			groups: ['shop-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//
		/*
		 * Orders
		 */
		.when('/shop/orders/board', {
			templateUrl: 'views/amd-shop-orders-board.html',
			name: 'Orders Board',
			icon: 'dashboard',
			groups: ['shop-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//
		.when('/shop/orders/:orderId', {
			controller: 'AmdShopOrderCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-shop-order.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//

		/*
		 * Deliveries
		 */
		.when('/shop/delivers', {
			templateUrl: 'views/amd-shop-delivers.html',
			name: 'Delivers',
			icon: 'local_shipping',
			groups: ['shop-management'],
			navigate: true,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})//
		.when('/shop/delivers/:deliverId', {
			controller: 'AmdShopDeliverCtrl',
			templateUrl: 'views/amd-shop-deliver.html',
			navigate: false,
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		});




	/************************************************************************
	 * Zone
	 ***********************************************************************/

	/*
	 * @ngInject
	 */
	function canAccessZones($rootScope) {
		return !$rootScope.app.user.tenant_owner;
	}

	$routeProvider.when('/shop/zones', {
		templateUrl: 'views/amd-shop-zones.html',
		name: 'Zones',
		icon: 'layers',
		groups: ['shop-management'],
		navigate: true,
		/*
		 * @ngInject
		 */
		protect: canAccessZones,
	}).when('/shop/zones/:zoneId', {
		templateUrl: 'views/amd-shop-zone.html',
		navigate: false,
		/*
		 * @ngInject
		 */
		protect: canAccessZones,
	});


	/************************************************************************
	 * Agency
	 ***********************************************************************/
	/*
	 * @ngInject
	 */
	function canAccessAgency($rootScope) {
		return !$rootScope.app.user.tenant_owner;
	}

	$routeProvider.when('/shop/agencies', {
		templateUrl: 'views/amd-shop-agencies.html',
		name: 'Agencies',
		icon: 'store',
		groups: ['shop-management'],
		navigate: true,
		protect: canAccessAgency,
	}).when('/shop/agencies/:itemId', {
		templateUrl: 'views/amd-shop-agency.html',
		navigate: false,
		protect: canAccessAgency,
	});
});