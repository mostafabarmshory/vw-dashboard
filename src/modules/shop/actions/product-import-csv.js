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

export default {// import products menu
	priority: 10,
	icon: 'cloud_upload',
	group: 'Shop',
	title: 'Import Products',
	description: 'Imports products from a CSV file',
	/* @ngInject */
	action: function($event, $shop, $q, $mbTranslate, $mbResource, $mbDispatcherUtil) {

		function createProducts(list) {
			var promisesList = [];
			list.forEach(function(item) {
				// Send REST to create Product
				var promise = $shop.putProduct(item)
					// Fire event
					.then(function(prodcut) {
						$mbDispatcherUtil.fireCreated(AMD_SHOP_PRODUCT_SP, [prodcut]);
						return prodcut;
					}, function() {
						alert($mbTranslate.instant('Failed to create new prodcut.'));
					});
				promisesList.push(promise);
			});
			return $q.all(promisesList);
		}

		function processData(allText) {
			var allTextLines = allText.split(/\r\n|\n/);
			var headers = allTextLines[0].split(',');
			var lines = [];

			for (var i = 1; i < allTextLines.length; i++) {
				var data = allTextLines[i].split(',');
				if (data.length === headers.length) {

					var tarr = {};
					for (var j = 0; j < headers.length; j++) {
						tarr[headers[j]] = data[j];
					}
					lines.push(tarr);
				}
			}
			return lines;
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
				return createProducts(items)
					.then(function() {
						toast($mbTranslate.instant('Products are added successfully.'));
					});
			});
			// read as text file
			reader.readAsText(file);
		}

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return $mbResource
			.get("file", {
				title: 'Import List of Products',
				config: {},
				targetEvent: $event
			})
			.then(function(res) {
				var file = res.files[0];
				processFileContent(file, processData);
			});
	},
	groups: ['Shope']
}

