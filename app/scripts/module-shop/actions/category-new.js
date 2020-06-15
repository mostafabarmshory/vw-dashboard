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

mblowfish.addAction(AMD_SHOP_CATEGORY_CREATE_ACTION, {// create new category menu
	priority: 10,
	icon: 'photo_album',
	title: 'New Category',
	description: 'Creates new category',
	/* @ngInject */
	action: function($event, $shop, $mbTranslate, $mbDynamicForm, $mbDispatcherUtil) {
		var defVal = {};
		var values = $event.values;
		if (values && values.length) {
			defVal = values[0];
		}
		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		$shop.categorySchema()
			.then(function(schema) {
				return $mbDynamicForm
					.openDialog({
						title: 'New Category',
						value: defVal,
						schema: schema
					})
					.then(function(data) {
						return $shop.putCategory(data)
							.then(function(cat) {
								$mbDispatcherUtil.fireCreated(AMD_SHOP_CATEGORY_SP, [cat]);
							}, function() {
								alert($mbTranslate.instant('Failed to create new category.'));
							});
					});
			});
	},
	groups: ['Shope']
});