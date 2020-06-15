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

/* exported AMD_SHOP_ZONE_SP */

mblowfish.addConstants({
	AMD_SHOP_AGENCY_SP: '/shop/agencies',
	AMD_SHOP_CATEGORY_SP: '/shop/categories',
	AMD_SHOP_DELIVER_SP: '/shop/delivers',
	AMD_SHOP_ORDERS_SP: '/shop/orders',
	AMD_SHOP_PRODUCT_SP: '/shop/products',
	AMD_SHOP_SERVICE_SP: '/shop/services',
	AMD_SHOP_ZONE_SP: '/shop/zones',
	AMD_SHOP_TAG_SP: '/shop/tags',

	AMD_SHOP_AGENCY_DELETE_ACTION: 'amd.shop.agency.delete',
	AMD_SHOP_AGENCY_CREATE_ACTION: 'amd.shop.agency.create',
	AMD_SHOP_AGENCY_UPDATE_ACTION: 'amd.shop.agency.update',

	AMD_SHOP_CATEGORY_DELETE_ACTION: 'amd.shop.category.delete',
	AMD_SHOP_CATEGORY_CREATE_ACTION: 'amd.shop.category.create',
	AMD_SHOP_CATEGORY_UPDATE_ACTION: 'amd.shop.category.update',

	AMD_SHOP_DELIVER_DELETE_ACTION: 'amd.shop.deliver.delete',
	AMD_SHOP_DELIVER_CREATE_ACTION: 'amd.shop.deliver.create',
	AMD_SHOP_DELIVER_UPDATE_ACTION: 'amd.shop.deliver.update',

	AMD_SHOP_ORDER_DELETE_ACTION: 'amd.shop.order.delete',
	AMD_SHOP_ORDER_CREATE_ACTION: 'amd.shop.order.create',
	AMD_SHOP_ORDER_UPDATE_ACTION: 'amd.shop.order.update',

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

mblowfish.config(function($mbIconProvider) {

	$mbIconProvider
		.addShapes({
			'shop-zone': '<path id="path2" d="M 23,7 V 1 H 17 V 3 H 7 V 1 H 1 V 7 H 3 V 17 H 1 v 6 h 6 v -2 h 10 v 2 h 6 V 17 H 21 V 7 Z M 3,3 H 5 V 5 H 3 Z M 5,21 H 3 V 19 H 5 Z M 17,19 H 7 V 17 H 5 V 7 H 7 V 5 h 10 v 2 h 2 v 10 h -2 z m 4,2 h -2 v -2 h 2 z M 19,5 V 3 h 2 v 2 z" /><path id="path4" fill="none" d="M0 0h24v24H0z" />'
		});
});