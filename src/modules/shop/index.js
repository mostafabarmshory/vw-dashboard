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
import importProductAction from './actions/product-import-csv';
import importCategoryAction from './actions/category-import-json';

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

import mblowfishIntegerateRun from './mblowfish-integerate-run';
import mblowfishConfig from './mblowfish-config';

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

	.action(AMD_SHOP_CATEGORY_IMPORTJSON_ACTION, importCategoryAction)
	.action(AMD_SHOP_PRODUCT_IMPORTCSV_ACTION, importProductAction)

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

	.config(mblowfishConfig)
	.run(mblowfishIntegerateRun);




