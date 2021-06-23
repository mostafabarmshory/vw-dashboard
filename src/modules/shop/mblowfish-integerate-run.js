

export default function($mbToolbar) {
	'ngInject';
	// Contribute actions to views

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
		
		
	// Contribute to categories toolbar
	$mbToolbar.getToolbar(AMD_SHOP_CATEGORIES_VIEW)
		.addAction(AMD_SHOP_CATEGORY_CREATE_ACTION)
		.addAction(AMD_SHOP_CATEGORY_IMPORTJSON_ACTION);
	/*
	This is equal to :
	
	$mbView
		.getView(AMD_SHOP_CATEGORIES_VIEW)
		.getToolbar()
		.addAction(AMD_SHOP_CATEGORY_IMPORTJSON_ACTION);
	*/
	$mbToolbar.getToolbar(AMD_SHOP_PRODUCTS_VIEW)
		.addAction(AMD_SHOP_PRODUCT_IMPORTCSV_ACTION);
}