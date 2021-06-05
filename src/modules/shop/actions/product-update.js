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
import {differenceCollection} from '../../core/Utiles';


export default {// create new category menu
	icon: 'save',
	title: 'Update Product',
	demon: true,
	group: 'Shop',
	preAuthorize: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	action: function($event, $q) {
		'ngInject';

		var values = $event.values;
		if (!values && !values.length) {
			// TODO: add log
			return;
		}

		var 
			jobs = [],
			models = [];


		values.forEach(product => {
			// update the product
			jobs
				.push(product
					.update()
					.then(newProduct => models.push(newProduct)));
			var 
				newCollection, 
				oldCollection;
			
			// update categories
			newCollection = product.categories || [];
			oldCollection = product.originCategories || [];
			differenceCollection(newCollection, oldCollection)
				.forEach(category => jobs.push(product.putCategory(category)));
			differenceCollection(oldCollection, newCollection)
				.forEach(category => jobs.push(product.deleteCategory(category)));
				
			// update metas
			newCollection = product.metas || [];
			oldCollection = product.originMetas || [];
			newCollection.forEach(meta => {
					if(meta.id < 0 || meta.derty){
						jobs.push(product.putMetafield(meta));
					}
					delete meta.derty;
				});
			differenceCollection(oldCollection, newCollection)
				.forEach(meta => {
					if(meta.id || meta.id > 1){
						jobs.push(product.deleteMetafield(meta));
					}
				});
			
		});

		return $q
			.all(jobs)
			.then(() => {
				// TODO: maso, 2021: dispatch events.
				return models;
			});
	},
}


