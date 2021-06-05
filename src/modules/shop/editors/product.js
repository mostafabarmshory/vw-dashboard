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

import templatUrl from './product.html';




export const graphQl = '{' +
	'id,title,description,brand,model,manufacturer,avatar,price,off,' +
	'categories{id, name},' +
	'}';

/**
@ngdoc Editor
@name AmdShopProductCtrl
@description Controller of products list


 */
export default {
	templateUrl: templatUrl,
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: function(
		$scope, $element, $editor, $state,
		$shop, ShopProduct,
		$mbTranslate, $controller, $mbDialog, $mbResource, $q, QueryParameter, $mbActions) {
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
		this.removeMetafield = (meta) => {
			ctrl.metas = removeItemFromCollection(ctrl.metas, meta);
			ctrl.setDerty(true);
		}

		this.addMetafield = ($key, $value, $unit, $namespace) => {
			$key = $key || 'key';
			var $meta = {
				id: -1000 * Math.random(),
				key: $key,
				value: $value,
				unit: $unit,
				namespace: $namespace
			};
			ctrl.metas.push($meta);
			ctrl.setMetaDerty($meta);
		}

		this.setMetaDerty = ($meta) => {
			$meta.derty = true;
			ctrl.setDerty(true);
		}

		this.setMetaValue = ($meta, $type, $event) => {
			return $mbResource
				.get($type, {
					targetEvent: $event
				})//
				.then((url) => {
					$meta.value = url;
					ctrl.setMetaDerty($meta);
				});
		}
		//----------------------------------------------------------------------------
		// Product
		//----------------------------------------------------------------------------
		this.updateProduct = $event => {
			Object.assign(ctrl.product, {
				// category
				categories: ctrl.categories,
				originCategories: ctrl.originCategories,
				// meata
				metas: ctrl.metas,
				originMetas: ctrl.originMetas
			});
			$event.values = [
				ctrl.product
			];
			$mbActions
				.exec(AMD_SHOP_PRODUCT_UPDATE_ACTION, $event)
				.then(products => {
					ctrl.product = products[0];
					ctrl.setDerty(false);
				});
		}

		//----------------------------------------------------------------------------
		// Categories
		//----------------------------------------------------------------------------
		var categorySearchQueryParameter = new QueryParameter();
		categorySearchQueryParameter.setOrder('id', 'd');

		this.searchCategoires = (query) => {
			categorySearchQueryParameter.setQuery(query);
			return $shop
				.getCategories(categorySearchQueryParameter)
				.then(list => list.items);
		};


		this.createCategory = (name, $event) => {
			$event.values = [{
				name: name,
				description: name
			}];
			$mbActions.exec(AMD_SHOP_CATEGORY_CREATE_ACTION, $event)
				.then((categories) => {
					ctrl.searchCategoiresText = '';
					categories.forEach(category => {
						ctrl.categories.push(category);
						$editor.setDerty(true);
					});
				});
		};

		//----------------------------------------------------------------------------
		// Convertors
		//----------------------------------------------------------------------------
		function toCategories(data) {
			return data;
		}

		function toMetadata(data) {
			return data;
		}

		function toProductData(data) {
			return new ShopProduct(data);
		}

		//----------------------------------------------------------------------------
		// Init the editor
		//----------------------------------------------------------------------------
		$shop
			.getProduct($state.params.productId, {
				graphql: graphQl
			})//
			.then(productData => {
				// load categories
				this.originCategories = toCategories(productData.categories) || [];
				this.categories = [...this.originCategories];
				delete productData.categories;

				// load metas
				this.originMetas = toMetadata(productData.metas) || [];
				this.metas = [...this.originMetas];
				delete productData.metas;

				// load product
				this.product = toProductData(productData);

				// init the editor
				this
					.setTitle('Product:' + productData.id)
					.setModel(this.product)
					.setStorePath(AMD_SHOP_PRODUCT_SP);
			}, () => {
				// TODO: handler error
				alert($mbTranslate.instant('Faild to load the product.'));
			});

	}
}



