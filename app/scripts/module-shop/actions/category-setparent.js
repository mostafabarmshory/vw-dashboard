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


mblowfish.addAction(AMD_SHOP_CATEGORY_SETPARENT_ACTION, {
	demon: true,
	group: 'Shop',
	preAuthorize: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	action: function($event, $q, ShopCategory, $mbDispatcherUtil, $mbTranslate) {
		'ngInject';
		var category = $event.category;
		var parent = $event.parent;

		if (!category || !parent) {
			// TODO: maso, 2020: add log
			return $q.rject('No value to update');
		}

		if (!(category instanceof ShopCategory)) {
			category = new ShopCategory(category);
		}
		category.parent_id = parent.id;
		return category
			.update()
			.then(function(newCategory) {
				$mbDispatcherUtil.fireUpdated(AMD_SHOP_CATEGORY_SP, [newCategory]);
			}, function() {
				alert($mbTranslate.instant('Fail to update the category.'));
			});
	}
});

