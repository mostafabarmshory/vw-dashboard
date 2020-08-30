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

mblowfish
	.addConstants({
		//------------------------------------------------------------
		// ACTIONS
		//------------------------------------------------------------
		AMD_SHOP_CATEGORY_IMPORTJSON_ACTION: 'amd.shop.category.importJson',
		AMD_SHOP_PRODUCT_IMPORTCSV_ACTION: 'amd.shop.product.importCsv'
	});

/*
NOTE: You are allowed to contribute to modules view if and only if ther were loaded.
*/
mblowfish.run(function($mbToolbar) {
	'ngInject';
	// Contribute to categories toolbar
	$mbToolbar.getToolbar(AMD_SHOP_CATEGORIES_VIEW)
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
});