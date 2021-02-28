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
import mblowfish from 'mblowfish';
import Constants from './Constants';

import agencyCreateAction from './actions/agency-create';
import agencyDeleteAction from './actions/agency-delete';
import categoryDeleteAction from './actions/category-delete';
import categoryCreateAction from './actions/category-new';
import categorySetParentAction from './actions/category-setparent';
import categoryUpdateAction from './actions/category-update';
import deliverCreateAction from './actions/deliver-create';
import productCreateAction from './actions/product-create';
import serviceCreateAction from './actions/service-create';
import tagCreateAction from './actions/tag-create';
import zoneCreateAction from './actions/zone-create';

import AmdShopAgenciesCtrl from './controllers/AmdShopAgenciesCtrl';
import AmdShopCategoriesCtrl from './controllers/AmdShopCategoriesCtrl';
import AmdShopOrderCtrl from './controllers/AmdShopOrderCtrl';
import AmdShopZonesCtrl from './controllers/AmdShopZonesCtrl';

import agencyEditor from './editors/agency';
import categoryEditor from './editors/category';
import deliverEditor from './editors/deliver';
import orderEditor from './editors/order';
import productEditor from './editors/product';
import serviceEditor from './editors/service';
import tagEditor from './editors/tag';
import zoneEditor from './editors/zone';

import agencyIdResource from './resources/agency-id';
import categoriesResource from './resources/categories';
import zoneIdsResource from './resources/zone-id';

import agenciesView from './views/agencies';
import categoriesView from './views/categories';
import deliversView from './views/delivers';
import ordersView from './views/orders';
import ordersBoardView from './views/orders-board';
import productsView from './views/products';
import servicesView from './views/services';
import tagsView from './views/tags';
import zoneView from './views/zones';

mblowfish
	.constant(Constants)

	.action(Constants.AMD_SHOP_AGENCY_CREATE_ACTION, agencyCreateAction)
	.action(Constants.AMD_SHOP_AGENCY_DELETE_ACTION, agencyDeleteAction)
	.action(Constants.AMD_SHOP_CATEGORY_DELETE_ACTION, categoryDeleteAction)
	.action(Constants.AMD_SHOP_CATEGORY_CREATE_ACTION, categoryCreateAction)
	.action(Constants.AMD_SHOP_CATEGORY_SETPARENT_ACTION, categorySetParentAction)
	.action(Constants.AMD_SHOP_CATEGORY_UPDATE_ACTION, categoryUpdateAction)
	.action(Constants.AMD_SHOP_DELIVER_CREATE_ACTION, deliverCreateAction)
	.action(Constants.AMD_SHOP_PRODUCT_CREATE_ACTION, productCreateAction)
	.action(Constants.AMD_SHOP_SERVICE_CREATE_ACTION, serviceCreateAction)
	.action(Constants.AMD_SHOP_TAG_CREATE_ACTION, tagCreateAction)
	.action(Constants.AMD_SHOP_ZONE_CREATE_ACTION, zoneCreateAction)

	.controller('AmdShopAgenciesCtrl', AmdShopAgenciesCtrl)
	.controller('AmdShopCategoriesCtrl', AmdShopCategoriesCtrl)
	.controller('AmdShopOrderCtrl', AmdShopOrderCtrl)
	.controller('AmdShopZonesCtrl', AmdShopZonesCtrl)

	.editor('/shop/agencies/:itemId', agencyEditor)
	.editor('/shop/categories/:categoryId', categoryEditor)
	.editor('/shop/delivers/:itemId', deliverEditor)
	.editor('/shop/orders/:orderId', orderEditor)
	.editor('/shop/products/:productId', productEditor)
	.editor('/shop/services/:serviceId', serviceEditor)
	.editor('/shop/tags/:tagId', tagEditor)
	.editor('/shop/zones/:itemId', zoneEditor)

	.resource('/shop/agency#id', agencyIdResource)
	.resource('/shop/categories', categoriesResource)
	.resource('/shop/zones#id', zoneIdsResource)
	
	.view('/shop/agencies', agenciesView)
	.view(AMD_SHOP_CATEGORIES_VIEW, categoriesView)
	.view(AMD_SHOP_DELIVERS_VIEW, deliversView)
	.view('/shop/orders', ordersView)
	.view('/shop/orders-board', ordersBoardView)
	.view(AMD_SHOP_PRODUCTS_VIEW, productsView)
	.view(AMD_SHOP_SERVICES_VIEW, servicesView)
	.view(AMD_SHOP_TAGS_VIEW, tagsView)
	.view(AMD_SHOP_ZONES_VIEW, zoneView)

	.config(function($mbIconProvider) {
		'ngInject';

		$mbIconProvider
			.addShapes({
				'shop-zone': '<path id="path2" d="M 23,7 V 1 H 17 V 3 H 7 V 1 H 1 V 7 H 3 V 17 H 1 v 6 h 6 v -2 h 10 v 2 h 6 V 17 H 21 V 7 Z M 3,3 H 5 V 5 H 3 Z M 5,21 H 3 V 19 H 5 Z M 17,19 H 7 V 17 H 5 V 7 H 7 V 5 h 10 v 2 h 2 v 10 h -2 z m 4,2 h -2 v -2 h 2 z M 19,5 V 3 h 2 v 2 z" /><path id="path4" fill="none" d="M0 0h24v24H0z" />'
			});
	})
	.run(function($mbToolbar) {
		'ngInject';
		// Contribute actions to views
		$mbToolbar.getToolbar(AMD_SHOP_CATEGORIES_VIEW)
			.addAction(AMD_SHOP_CATEGORY_CREATE_ACTION);

		$mbToolbar.getToolbar(AMD_SHOP_PRODUCTS_VIEW)
			.addAction(AMD_SHOP_PRODUCT_CREATE_ACTION);

		$mbToolbar.getToolbar(AMD_SHOP_DELIVERS_VIEW)
			.addAction(AMD_SHOP_DELIVER_CREATE_ACTION);

		$mbToolbar.getToolbar(AMD_SHOP_SERVICES_VIEW)
			.addAction(AMD_SHOP_SERVICE_CREATE_ACTION);

		$mbToolbar.getToolbar(AMD_SHOP_TAGS_VIEW)
			.addAction(AMD_SHOP_TAG_CREATE_ACTION);

		$mbToolbar.getToolbar(AMD_SHOP_ZONES_VIEW)
			.addAction(AMD_SHOP_ZONE_CREATE_ACTION);
	});