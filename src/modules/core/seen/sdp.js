
import mblowfish from 'mblowfish';
import seen from '../../../seen'
//----------------------------------------------------------------------------------------
//                                      Data Model
//----------------------------------------------------------------------------------------
/**
 * @ngdoc Factories
 * @name SdpAsset
 * @description SDP Asset
 * 
 * @attr {integer} id of the asset
 */
mblowfish.factory('SdpAsset', seen.factory({
	url: '/api/v2/sdp/assets',
	resources: [{
		name: 'Content',
		type: 'binary',
		url: '/content'
	}, {
		name: 'Tag',
		factory: 'SdpTag',
		type: 'collection',
		url: '/tags'
	}, {
		name: 'Category',
		factory: 'SdpCategory',
		type: 'collection',
		url: '/categories'
	}, {
		name: 'Link',
		factory: 'SdpLink',
		type: 'collection',
		url: '/links'
	}, {
		name: 'AssetRelation',
		factory: 'SdpAssetRelation',
		type: 'collection',
		url: '/relations'
	}, {
		name: 'Child',
		factory: 'SdpAsset',
		type: 'collection',
		url: '/children'
	}, {
		name: 'Metadata',
		factory: 'SdpMetadata',
		type: 'collection',
		url: '/metas'
	}]
}));

/**
 * @ngdoc Factories
 * @name SdpAssetRelation
 * @description Defines relation between assets
 */
mblowfish.factory('SdpAssetRelation', seen.factory({
	url: '/api/v2/sdp/asset-relations'
}));

/**
 * @ngdoc Factories
 * @name SdpCategory
 * @description Defines a category
 */
mblowfish.factory('SdpCategory', seen.factory({
	url: '/api/v2/sdp/categories',
	resources: [{
		name: 'Asset',
		factory: 'SdpAsset',
		type: 'collection',
		url: '/assets'
	}, {
		name: 'Child',
		factory: 'SdpCategory',
		type: 'collection',
		url: '/children'
	}]
}));

/**
 * @ngdoc Factories
 * @name SdpTag
 * @description Defines a tag
 */
mblowfish.factory('SdpTag', seen.factory({
	url: '/api/v2/sdp/tags',
	resources: [{
		name: 'Asset',
		factory: 'SdpAsset',
		type: 'collection',
		url: '/assets',
	}]
}));

/**
 * @ngdoc Factories
 * @name SdpDrive
 * @description Defines a drive which stores assets` files
 */
mblowfish.factory('SdpDrive', seen.factory({
	url: '/api/v2/sdp/drives'
}));

/**
 * @ngdoc Factories
 * @name SdpDriver
 * @description Defines a driver to work with drives which store assets` files
 */
mblowfish.factory('SdpDriver', seen.factory({
	url: '/api/v2/sdp/drivers'
}));

/**
 * @ngdoc Factories
 * @name SdpLink
 * @description Defines a link to download the file of an asset
 */
mblowfish.factory('SdpLink', seen.factory({
	url: '/api/v2/sdp/links',
	resources: [{
		name: 'Content',
		type: 'binary',
		url: '/content'
	}, {
		name: 'Payment',
		factory: 'BankReceipt',
		type: 'collection',
		url: '/payments'
	}]
}));

/**
 * @ngdoc Factories
 * @name SdpProfile
 * @description Defines sdp profile
 */
mblowfish.factory('SdpProfile', seen.factory({
	url: '/api/v2/sdp/accounts/{account_id}/profiles'
}));

/**
 * @ngdoc Factories
 * @name SdpMetadata
 * @description Metadata of an Asset
 */
mblowfish.factory('SdpMetadata', seen.factory({
	url: '/api/v2/sdp/asset/{asset_id}/metas'
}));

/**
 * @ngdoc Services
 * @name $sdp
 * @description Manages entities in the SDP
 */
mblowfish.service('$sdp', seen.service({
	resources: [{
		name: 'Asset',
		factory: 'SdpAsset',
		type: 'collection',
		url: '/api/v2/sdp/assets'
	}, {
		name: 'Category',
		factory: 'SdpCategory',
		type: 'collection',
		url: '/api/v2/sdp/categories'
	}, {
		name: 'Tag',
		factory: 'SdpTag',
		type: 'collection',
		url: '/api/v2/sdp/tags'
	}, {
		name: 'Link',
		factory: 'SdpLink',
		type: 'collection',
		url: '/api/v2/sdp/links'
	}, {
		name: 'AssetRelation',
		factory: 'SdpAssetRelation',
		type: 'collection',
		url: '/api/v2/sdp/asset-relations'
	}, {
		name: 'Drive',
		factory: 'SdpDrive',
		type: 'collection',
		url: '/api/v2/sdp/drives'
	}, {
		name: 'Driver',
		factory: 'SdpDriver',
		type: 'collection',
		url: '/api/v2/sdp/drivers'
	}]
}));
