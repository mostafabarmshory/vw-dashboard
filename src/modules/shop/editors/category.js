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

import templatUrl from './category.html';
import {
	removeItemFromCollection
} from '../../core/Utiles';



export const graphQl =
	'{' +
	'id,name,description,thumbnail,parent_id,' +
	'parent{id,name,description,thumbnail}' +
	'metafields{id,category_id,key,value}' +
	'}';

function EditorCtrl($element, $editor, $scope, $state, $shop, $controller, $mbTranslate, $mbActions, ShopCategory, QueryParameter, $mbResource) {
	'ngInject';

	/*
	 * Extends collection controller from MbAbstractCtrl 
	 */
	angular.extend(this, $controller('MbSeenAbstractItemEditorCtrl', {
		$scope: $scope,
		$element: $element,
		$editor: $editor
	}));

	var ctrl = this;


	//----------------------------------------------------------------------------
	// Meta fields
	//----------------------------------------------------------------------------
	ctrl.removeMetafield = (meta) => {
		ctrl.metafields = removeItemFromCollection(ctrl.metafields, meta);
		ctrl.setDerty(true);
	}

	ctrl.addMetafield = ($key, $value) => {
		$key = $key || 'key';
		var $meta = {
			id: -1000 * Math.random(),
			key: $key,
			value: $value,
		};
		ctrl.metafields.push($meta);
		ctrl.setMetaDerty($meta);
	}

	ctrl.setMetaDerty = ($meta) => {
		$meta.derty = true;
		ctrl.setDerty(true);
	}

	ctrl.setMetaValueByResource = ($meta, $type, $event) => {
		return $mbResource
			.get($type, {
				targetEvent: $event
			})//
			.then((url) => {
				$meta.value = url;
				ctrl.setMetaDerty($meta);
			});
	}

	ctrl.setMetaValue = ($key, $value) => {
		var $meta;
		ctrl.metafields.forEach(meta => {
			if (meta.key === $key) {
				$meta = meta;
			}
		});
		if ($meta) {
			$meta.value = $value;
			ctrl.setMetaDerty($meta);
			return;
		}
		return ctrl.addMetafield($key, $value);
	}

	ctrl.metafieldsMoreActions = [/*{
			icon: 'face',
			title: 'Init with basic fields',
			action: function() {
				ctrl.setMetaValue('image', '', '', 'theme');
				ctrl.setMetaValue('color', 'red', '', 'physical');
				ctrl.setMetaValue('size', 'Larg', '', 'physical');
				ctrl.setMetaValue('rating', '1', '', 'community');
				ctrl.setMetaValue('vstore.stock', '1', '', 'theme');
				ctrl.setMetaValue('vstore.new', 'true', '', 'theme');
				ctrl.setMetaValue('vstore.sale', 'true', '', 'theme');
			}
		}*/];

	//----------------------------------------------------------------------------
	// Category
	//----------------------------------------------------------------------------
	var categorySearchQueryParameter = new QueryParameter();
	categorySearchQueryParameter.setOrder('id', 'd');

	ctrl.updateCategory = ($event) => {
		if (ctrl.parents.length != 0) {
			ctrl.model.parent_id = ctrl.parents[0].id;
		} else {
			ctrl.model.parent_id = 0;
		}
		Object.assign(ctrl.model, {
			metafields: ctrl.metafields,
			originMetafields: ctrl.originMetafields,
		});

		$event.values = [ctrl.model];
		return $mbActions
			.exec(AMD_SHOP_CATEGORY_UPDATE_ACTION, $event)
			.then(items => {
				ctrl.category = items[0];
				ctrl.setModel(ctrl.category);
				ctrl.setDerty(false);
			});
	};

	ctrl.searchCategoires = (query) => {
		categorySearchQueryParameter.setQuery(query);
		return $shop
			.getCategories(categorySearchQueryParameter)
			.then(list => list.items);
	};

	//----------------------------------------------------------------------------
	// Data
	//----------------------------------------------------------------------------
	function toCategory($data) {
		return new ShopCategory($data);
	}

	function toCategories($data) {
		var result = [];
		$data.forEach(item => {
			if (item) {
				result.push(item);
			}
		});
		return result;
	}

	function toMetafields($data) {
		return $data || [];
	}

	//----------------------------------------------------------------------------
	// Init the editor
	//----------------------------------------------------------------------------
	$shop
		.getCategory($state.params.categoryId, {
			graphql: graphQl
		})//
		.then(categoryData => {
			// load parent
			this.originParents = toCategories([categoryData.parent]);
			this.parents = [...this.originParents];
			delete categoryData.parent;

			// load metas
			this.originMetafields = toMetafields(categoryData.metafields);
			this.metafields = [...this.originMetafields];
			delete categoryData.metafields;


			// load product
			this.category = toCategory(categoryData);

			// init the editor
			this
				.setTitle('Category:' + categoryData.id)
				.setModel(this.category)
				.setStorePath(AMD_SHOP_CATEGORY_SP);
		}, () => {
			// TODO: handler error
			alert($mbTranslate.instant('Faild to load the category.'));
		});
}

/**
@ngdoc Editors
@name /shop/categories/:categoryId
@description
Manage a shop category.

 */
export default {
	templateUrl: templatUrl,
	controllerAs: 'ctrl',
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: EditorCtrl
}



