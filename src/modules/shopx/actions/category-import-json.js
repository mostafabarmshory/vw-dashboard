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

mblowfish.addAction(AMD_SHOP_CATEGORY_IMPORTJSON_ACTION, {// import categories menu
	priority: 10,
	icon: 'cloud_upload',
	title: 'Import Categories',
	description: 'Imports categories from a JSON file',
	group: 'Shop',
	/* @ngInject */
	action: function($event, $shop, $q, $mbTranslate, $mbDialog, $mbDispatcherUtil) {

		function createCategories(list) {
			var promisesList = [];
			list.forEach(function(item) {
				var childs = item.children;
				// Send REST to create category
				item.children = null;
				var promise = $shop.putCategory(item)
					// Fire event
					.then(function(cat) {
						$mbDispatcherUtil.fireCreated(AMD_SHOP_CATEGORY_SP, [cat]);
						return cat;
					}, function() {
						alert($mbTranslate.instant('Failed to create new category.'));
					})
					// Add childs
					.then(function(cat) {
						if (childs) { // category has some childs
							childs.forEach(function(childItem) {
								childItem.parent_id = cat.id;
							});
							return createCategories(childs);
						}
					});
				promisesList.push(promise);
			});
			return $q.all(promisesList);
		}

		function processData(allText) {
			var json = JSON.parse(allText);
			var catList = json.categories;
			return catList;
		}

		function processFileContent(file, processorFunc) {
			// perform validation on file type & size if required
			// read the file
			var reader = new FileReader();
			// file reading failed
			reader.addEventListener('error', function() {
				alert('Error : Failed to read file');
			});
			// file read progress 
			reader.addEventListener('progress', function(e) {
				if (e.lengthComputable === true) {
					var percent_read = Math.floor((e.loaded / e.total) * 100);
					console.log(percent_read + '% read');
				}
			});
			// file reading finished successfully
			reader.addEventListener('load', function(e) {
				// contents of file in variable     
				var text = e.target.result;
				var items = processorFunc(text);
				return createCategories(items)
					.then(function() {
						toast($mbTranslate.instant('Categories are added successfully.'));
					});
			});
			// read as text file
			reader.readAsText(file);
		}

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return $mbDialog
			.show({
				title: 'Import List of Categories',
				config: {},
				controller: 'AmdNavigatorDialogCtrl',
				controllerAs: 'ctrl',
				templateUrl: 'scripts/module-shop-x/actions/select-file-dialog.html'
			})
			.then(function(res) {
				var file = res.files[0];
				processFileContent(file, processData);
			});

	},
	groups: ['Shope']
});