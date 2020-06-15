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


mblowfish.addAction('create:/shop/delivers', {// create new category menu
	title: 'New Deliver',
	icon: 'photo_album',
	description: 'Creates new delivers',
	/* @ngInject */
	action: function($shop, $window, $mbTranslate, $navigator, $mbDispatcher) {
		var job = $navigator.openDialog({
			templateUrl: 'views/dialogs/amd-shop-deliver-new.html',
			config: {}
		})
			.then(function(deliverData) {
				return $shop.putDeliver(deliverData);
			})
			.then(function(deliver) {
				$mbDispatcher.dispatch('/shop/delivers', {
					key: 'create',
					values: [deliver]
				});
			}, function() {
				$window.alert($mbTranslate.instant('Failed to create new deliver.'));
			});
		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop deliver', job);
		return job;
	},
	groups: shopActionGroups
});

