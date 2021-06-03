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

export default {// create new category menu
	priority: 10,
	icon: 'add',
	group: 'Shop',
	title: 'New Category',
	description: 'Creates new category',
	preAuthorize: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	action: function($event, $shop, $mbWizard, $q, $mbDispatcherUtil) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(AMD_SHOP_CATEGORY_CREATE_WIZARD);
		}


		var jobs = [],
			models = [];
		_.forEach(values, function(value) {
			jobs.push($shop
				.putCategory(value)
				.then(function(model) {
					models.push(model);
				}));
		});

		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(AMD_SHOP_CATEGORY_SP, models);
			});
	}
}


