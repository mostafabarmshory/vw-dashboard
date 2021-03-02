/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
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
import seen from '../../../seen'

/**
 * @ngdoc Factories
 * @name ShopProduct
 * @description Shop product
 * 
 * @attr {integer} id of the product
 */
mblowfish.factory('ShopProduct', seen.factory({
	url: '/api/v2/shop/products',
	resources: [{
		name: 'Metafield',
		factory: 'ProductMetafield',
		type: 'collection',
		url: '/metafields'
	}, {
		name: 'Category',
		factory: 'ShopCategory',
		type: 'collection',
		url: '/categories'
	}, {
		name: 'Tag',
		factory: 'ShopTag',
		type: 'collection',
		url: '/tags'
	}, {
		name: 'Tax',
		factory: 'ShopTax',
		type: 'collection',
		url: '/taxes'
	}]
}));

/**
 * @ngdoc Factories
 * @name ProductMetafield
 * @description Shop product metafield
 * 
 * @attr {integer} id of the product-metafield
 */
mblowfish.factory('ProductMetafield', seen.factory({
	url: '/api/v2/shop/product-metafields'
}));

/**
 * @ngdoc Factories
 * @name ShopService
 * @description Shop service
 * 
 * @attr {integer} id of the service
 */
mblowfish.factory('ShopService', seen.factory({
	url: '/api/v2/shop/services',
	resources: [{
		name: 'Metafield',
		factory: 'ServiceMetafield',
		type: 'collection',
		url: '/metafields'
	}, {
		name: 'Category',
		factory: 'ShopCategory',
		type: 'collection',
		url: '/categories'
	}, {
		name: 'Tag',
		factory: 'ShopTag',
		type: 'collection',
		url: '/tags'
	}, {
		name: 'Tax',
		factory: 'ShopTax',
		type: 'collection',
		url: '/taxes'
	}]
}));

/**
 * @ngdoc Factories
 * @name ServiceMetafield
 * @description Shop service metafield
 * 
 * @attr {integer} id of the service-metafield
 */
mblowfish.factory('ServiceMetafield', seen.factory({
	url: '/api/v2/shop/service-metafields'
}));

/**
 * @ngdoc Factories
 * @name ShopAddress
 * @description Shop address
 * 
 * @attr {integer} id of the address
 */
mblowfish.factory('ShopAddress', seen.factory({
	url: '/api/v2/shop/addresses'
}));

/**
 * @ngdoc Factories
 * @name ShopContact
 * @description Contact
 * 
 * @attr {integer} id of the contact
 */
mblowfish.factory('ShopContact', seen.factory({
	url: '/api/v2/shop/contacts'
}));

/**
 * @ngdoc Factories
 * @name ShopAgency
 * @description Agency
 */
mblowfish.factory('ShopAgency', seen.factory({
	url: '/api/v2/shop/agencies',
	resources: [{
		name: 'Order',
		factory: 'ShopOrder',
		type: 'collection',
		url: '/orders'
	}]
}));

/**
 * @ngdoc Factories
 * @name ShopZone
 * @description Zone
 * 
 * * @attr {integer} id of the zone
 */
mblowfish.factory('ShopZone', seen.factory({
	url: '/api/v2/shop/zones',
	resources: [{
		name: 'Member',
		factory: 'UserAccount',
		type: 'collection',
		url: '/members'
	}, {
		name: 'Order',
		factory: 'ShopOrder',
		type: 'collection',
		url: '/orders'
	}]
}));

/**
 * @ngdoc Factories
 * @name ShopOrderItem
 * @description Order item
 * 
 * @attr {integer} id of the item
 */
mblowfish.factory('ShopOrderItem', seen.factory({
	// TODO: maso, 2018: check if it is a child all time
	url: '/api/v2/shop/orders/{order_id}/items'
}));

/**
 * @ngdoc Factories
 * @name ShopOrderHistory
 * @description Order history
 * 
 * @attr {integer} id of the item
 */
mblowfish.factory('ShopOrderHistory', seen.factory({
	// TODO: maso, 2018: check if it is a child all time
	url: '/api/v2/shop/orders/{order_id}/histories'
}));
/**
 * @ngdoc Factories
 * @name ShopOrderAttachment
 * @description Order attachment
 * 
 * @attr {integer} id of the item
 */
mblowfish.factory('ShopOrderAttachment', seen.factory({
	// TODO: maso, 2018: check if it is a child all time
	url: '/api/v2/shop/orders/{order_id}/attachments',
	resources: [{
		name: 'Content',
		type: 'binary',
		url: '/content'
	}]
}));

/**
 * @ngdoc Factories
 * @name ShopOrder
 * @description Order 
 * 
 * @attr {integer} id of the order
 */
mblowfish.factory('ShopOrder', seen.factory({
	url: '/api/v2/shop/orders',
	resources: [{
		name: 'History',
		factory: 'ShopOrderHistory',
		type: 'collection',
		url: '/histories'
	}, {
		name: 'Item',
		factory: 'ShopOrderItem',
		type: 'collection',
		url: '/items'
	}, {
		name: 'PossibleTransition',
		factory: 'ShopOrderPossibleTransition',
		type: 'collection',
		url: '/possible-transitions'
	}, {
		name: 'Transition',
		factory: 'ShopOrderTransition',
		type: 'collection',
		url: '/transitions'
	}, {
		name: 'Payment',
		factory: 'BankReceipt',
		type: 'collection',
		url: '/payments'
	}, {
		name: 'Attachment',
		factory: 'ShopOrderAttachment',
		type: 'collection',
		url: '/attachments'
	}]
}));

/**
 * @ngdoc Factories
 * @name ShopOrderPossibleTransition
 * @description Order possible transitions
 * 
 * @attr {integer} id of the item
 */
mblowfish.factory('ShopOrderPossibleTransition', seen.factory({
	// TODO: maso, 2018: check if it is a child all time
	url: '/api/v2/shop/orders/{order_id}/possible-transitions'
}));

/**
 * @ngdoc Factories
 * @name ShopOrderTransition
 * @description Do transitions over on order
 * 
 * @attr {integer} id of the item
 */
mblowfish.factory('ShopOrderTransition', seen.factory({
	url: '/api/v2/shop/orders/{order_id}/transitions'
}));


/**
 * @ngdoc Factories
 * @name ShopItem order item
 * @description Shop item
 * 
 * @attr {integer} id of the Item
 */
mblowfish.factory('ShopItem', seen.factory({
	url: '/api/v2/shop/items',
	resources: [{
		name: 'Category',
		factory: 'ShopCategory',
		type: 'collection',
		url: '/categories'
	}, {
		name: 'Tag',
		factory: 'ShopTag',
		type: 'collection',
		url: '/tags'
	}, {
		name: 'Meta',
		factory: 'ShopMeta',
		type: 'collection',
		url: '/metas'
	}]
}));


/**
 * @ngdoc Factories
 * @name ShopCategory
 * @description category
 * 
 * @attr {integer} id of the tag
 */
mblowfish.factory('ShopCategory', seen.factory({
	url: '/api/v2/shop/categories',
	resources: [{
		name: 'Item',
		factory: 'ShopOrderItem',
		type: 'collection',
		url: '/items'
	},
	{
		name: 'Product',
		factory: 'ShopProduct',
		type: 'collection',
		url: '/products'
	},
	{
		name: 'Service',
		factory: 'ShopService',
		type: 'collection',
		url: '/services'
	}]
}));


/**
 * @ngdoc Factories
 * @name ShopMeta
 * @description meta
 */
mblowfish.factory('ShopMeta', seen.factory({
	url: '/api/v2/shop/metas'
}));


/**
 * @ngdoc Factories
 * @name ShopTag
 * @description Tag
 * 
 * It is an extension of seen-assort.AssortTag which have some extra functions
 * such as: - products(PaginatorParameter): lists products with this tag -
 * services(PaginatorParameter): lists services with this tag
 * 
 * @attr {integer} id of the tag
 */
mblowfish.factory('ShopTag', seen.factory({
	url: '/api/v2/shop/tags',
	resources: [{
		name: 'Item',
		factory: 'ShopOrderItem',
		type: 'collection',
		url: '/items'
	},
	{
		name: 'Product',
		factory: 'ShopProduct',
		type: 'collection',
		url: '/products'
	},
	{
		name: 'Service',
		factory: 'ShopService',
		type: 'collection',
		url: '/services'
	}]
}));


/**
 * @ngdoc Factories
 * @name ShopTax
 * @description Tax model
 * 
 * @attr {integer} id of the category
 */
mblowfish.factory('ShopTax', seen.factory({
	url: '/api/v2/shop/taxes',
	resources: [{
		name: 'Item',
		factory: 'ShopOrderItem',
		type: 'collection',
		url: '/items'
	}]
}));

/**
 * @ngdoc Factories
 * @name ShopDelivery
 * @description Delivery 
 * 
 * @attr {integer} id of the delivery
 */
mblowfish.factory('ShopDeliver', seen.factory({
	url: '/api/v2/shop/deliveries',
	resources: [{
		name: 'Category',
		factory: 'ShopCategory',
		type: 'collection',
		url: '/categories'
	}, {
		name: 'Tags',
		factory: 'ShopTag',
		type: 'collection',
		url: '/tags'
	}]
}));

/**
 * @ngdoc Services
 * @name $shop
 * @description Manages all items of a shop
 * 
 */
mblowfish.service('$shop', seen.service({
	resources: [
		{
			name: 'Product',
			factory: 'ShopProduct',
			type: 'collection',
			url: '/api/v2/shop/products'
		}, {
			name: 'Service',
			factory: 'ShopService',
			type: 'collection',
			url: '/api/v2/shop/services'
		}, {
			name: 'Address',
			factory: 'ShopAddress',
			type: 'collection',
			url: '/api/v2/shop/addresses'
		}, {
			name: 'Contact',
			factory: 'ShopContact',
			type: 'collection',
			url: '/api/v2/shop/contacts'
		}, {
			name: 'Agency',
			factory: 'ShopAgency',
			type: 'collection',
			url: '/api/v2/shop/agencies'
		}, {
			name: 'Zone',
			factory: 'ShopZone',
			type: 'collection',
			url: '/api/v2/shop/zones'
		}, {
			name: 'Category',
			factory: 'ShopCategory',
			type: 'collection',
			url: '/api/v2/shop/categories'
		}, {
			name: 'Tag',
			factory: 'ShopTag',
			type: 'collection',
			url: '/api/v2/shop/tags'
		}, {
			name: 'TaxClass',
			factory: 'ShopTax',
			type: 'collection',
			url: '/api/v2/shop/tax-class'
		}, {
			name: 'Order',
			factory: 'ShopOrder',
			type: 'collection',
			url: '/api/v2/shop/orders'
		}, {
			name: 'Deliver',
			factory: 'ShopDeliver',
			type: 'collection',
			url: '/api/v2/shop/deliveries'
		}]
}));
