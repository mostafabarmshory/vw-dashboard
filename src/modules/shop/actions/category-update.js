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


export default {
	demon: true,
	group: 'Shop',
	preAuthorize: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	action: function($event, $q, ShopCategory, $mbDispatcherUtil, $mbTranslate) {
		'ngInject';
		var values = $event.values;
		if (!values || !_.isArray(values) || values.length === 0) {
			// TODO: maso, 2020: add log
			return;
		}
		var jobs = [],
			newValues = [];
		values.forEach(category => {
			if (!(category instanceof ShopCategory)) {
				category = new ShopCategory(category);
			}
			jobs.push(category.update()
				.then(newCategory => {
					newValues.push(newCategory);
				}));
				
			var
				newCollection,
				oldCollection;
				
			// update metas
			newCollection = category.metafields || [];
			oldCollection = category.originMetafields || [];
			newCollection.forEach(meta => {
				if (meta.id < 0 || meta.derty) {
					jobs.push(category.putMetafield(meta));
				}
				delete meta.derty;
			});
			differenceCollection(oldCollection, newCollection)
				.forEach(meta => {
					if (meta.id || meta.id > 1) {
						jobs.push(category.deleteMetafield(meta));
					}
				});
		});

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return $q.all(jobs)
			.then(() => {
				$mbDispatcherUtil.fireUpdated(AMD_SHOP_CATEGORY_SP, newValues);
				return newValues;
			}, function() {
				alert($mbTranslate.instant('Fail to update the category.'));
			});
	}
}



