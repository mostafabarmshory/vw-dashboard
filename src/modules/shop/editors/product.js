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
import {
	removeItemFromCollection
} from '../../core/Utiles';



export const graphQl = '{' +
	'id,title,description,brand,model,manufacturer,avatar,price,off,' +
	'categories{id, name},' +
	'metafields{id, key, namespace, product_id, unit, value},' +
	'tags{id, name}' +
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
		// variant
		//----------------------------------------------------------------------------
		this.addVariant = () => {
			var $variant = {};
			ctrl.variant.push($variant);
			ctrl.setMetaDerty('variant');
		}

		this.setVariantValyeByResource = ($variant, $meta, $event) => {
			// type define
			var $type;
			switch ($meta.key) {
				case 'image':
					$type = 'image-url';
					break;
				default:
					$type = $meta.key;
			}
			
			// get resource
			return $mbResource
				.get($type, {
					targetEvent: $event
				})//
				.then((value) => {
					$variant[$meta.key] = value;
					ctrl.setMetaDerty('variant');
				});
		}

		// TODO: remove variant
		this.removeVariant = ($index, $event) => {
			this.variant.slice($index, 1);
			ctrl.setMetaDerty('variant', $event);
		}

		//----------------------------------------------------------------------------
		// Meta fields
		//----------------------------------------------------------------------------
		this.removeMetafield = (meta) => {
			ctrl.metafields = removeItemFromCollection(ctrl.metafields, meta);
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
			ctrl.metafields.push($meta);
			ctrl.setMetaDerty($meta);
		}

		this.setMetaDerty = ($meta) => {
			$meta.derty = true;
			ctrl.setDerty(true);
		}

		this.setMetaValueByResource = ($meta, $type, $event) => {
			return $mbResource
				.get($type, {
					targetEvent: $event
				})//
				.then((url) => {
					$meta.value = url;
					ctrl.setMetaDerty($meta);
				});
		}

		this.setMetaValue = ($key, $value, $unit, $namespace) => {
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
			return ctrl.addMetafield($key, $value, $unit, $namespace);
		}

		this.metafieldsMoreActions = [{
			icon: 'face',
			title: 'Init with basic fields',
			/*
			@ngInject
			*/
			action: function() {
				ctrl.setMetaValue('image', '', '', 'theme');
				ctrl.setMetaValue('color', 'red', '', 'physical');
				ctrl.setMetaValue('size', 'Larg', '', 'physical');
				ctrl.setMetaValue('rating', '1', '', 'community');
				ctrl.setMetaValue('vstore.stock', '1', '', 'theme');
				ctrl.setMetaValue('vstore.new', 'true', '', 'theme');
				ctrl.setMetaValue('vstore.sale', 'true', '', 'theme');
			}
		}];
		//----------------------------------------------------------------------------
		// Product
		//----------------------------------------------------------------------------
		this.updateProduct = $event => {
			ctrl.addMetafield('variant', JSON.stringify(ctrl.variant), '', 'std');
			Object.assign(ctrl.product, {
				// category
				categories: ctrl.categories,
				originCategories: ctrl.originCategories,
				// tags
				tags: ctrl.tags,
				originTags: ctrl.originTags,
				// meata
				metafields: ctrl.metafields,
				originMetafields: ctrl.originMetafields
			});
			$event.values = [
				ctrl.product
			];
			return $mbActions
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
		// tags
		//----------------------------------------------------------------------------
		var tagsSearchQueryParameter = new QueryParameter();
		tagsSearchQueryParameter.setOrder('id', 'd');

		this.searchTags = (query) => {
			tagsSearchQueryParameter.setQuery(query);
			return $shop
				.getTags(tagsSearchQueryParameter)
				.then(list => list.items);
		};


		this.createTag = (name, $event) => {
			$event.values = [{
				name: name,
				description: name
			}];
			$mbActions.exec(AMD_SHOP_TAG_CREATE_ACTION, $event)
				.then((tags) => {
					ctrl.searchTagsText = '';
					tags.forEach(tag => {
						ctrl.tags.push(tag);
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
			data.forEach(item => {
				if (item.key === 'variant') {
					try {
						ctrl.variant = JSON.parse(item.value);
					} catch ($ex) {
						// TODO: logger
					}
					return false;
				}
			});
			if (!Array.isArray(ctrl.variant)) {
				ctrl.variant = [];
			}
			return data;
		}

		function toProductData(data) {
			return new ShopProduct(data);
		}
		
		function toTags(list){
			return list || [];
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
				
				// load tags
				this.originTags = toTags(productData.tags) || [];
				this.tags = [...this.originTags];
				delete productData.tags;

				// load metas
				this.originMetafields = toMetadata(productData.metafields) || [];
				this.metafields = [...this.originMetafields];
				delete productData.metafields;

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



