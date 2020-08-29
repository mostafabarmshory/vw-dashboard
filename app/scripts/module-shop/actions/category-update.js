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


mblowfish.addAction(AMD_SHOP_CATEGORY_UPDATE_ACTION, {
	preAuthorize: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	action: function($event, $q, ShopCategory, $mbDispatcherUtil, $mbTranslate) {
		'ngInject';
		var values = $event.values;
		if (!values || !_.isArray(values) || values.length === 0) {
			// TODO: maso, 2020: add log
			return $q.rject('No value to update');
		}
		var jobs = [];
		var newValues = [];
		_.forEach(values, function(category) {
			if (!(category instanceof ShopCategory)) {
				category = new ShopCategory(category);
			}
			jobs.push(category.update()
				.then(function(newCategory) {
					newValues.push(newCategory);
				}));
		});

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireUpdated(AMD_SHOP_CATEGORY_SP, newValues);
			}, function() {
				alert($mbTranslate.instant('Fail to update the category.'));
			});
	}
});

