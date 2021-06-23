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

export default {// create new tag menu
	priority: 10,
	icon: 'label',
	title: 'New Tag',
	description: 'Creates new tag',
	group: 'Shop',
	preAuthorize: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	action: function($shop, $event, $mbDispatcherUtil, $mbDynamicForm, $mbActions, $q) {
		'ngInject';
		var data = {};
		var values = $event.values;
		if (!values || !Array.isArray(values) || values.length < 1) {
			// TODO: maso, 2020: add the job into the job lists
			// $app.addJob('Adding new shop category', job);
			return $shop.tagSchema()
				.then(function(schema) {
					return $mbDynamicForm
						.openDialog({
							title: 'New Tag',
							schema: schema,
							data: data
						})
						.then(function(itemData) {
							$event.values = [itemData];
							return $mbActions.exec(AMD_SHOP_TAG_CREATE_ACTION, $event);
						});
				});
		}



		var jobs = [],
			models = [];
		values.forEach(value => {
			jobs.push($shop.putTag(value)
				.then(function(tag) {
					models.push(tag);
				}));
		});

		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(AMD_SHOP_TAG_SP, models);
				return models;
			});
	},
}
