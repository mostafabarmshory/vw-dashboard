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
'use strict';

angular.module('ngMaterialDashboardSdp')

/**
 * A controller to select multiple sdp-categories from a list of categories
 * @ngdoc controller
 * @name SdpCategoriesListResourceCtrl
 * @description 
 * 
 */
.controller('SdpCategoriesListResourceCtrl', function($scope, $sdp, QueryParameter) {

	var paginatorParameter = new QueryParameter();
	paginatorParameter.setOrder('id', 'd');
	var requests = null;
	var ctrl = {
			loadingItems: false,
			items: [],
			selectedItems : $scope.value || []
	};

	/**
	 * Load next page
	 * 
	 * @returns promiss
	 */
	function nextPage() {
		if (ctrl.loadingItems || (requests && !requests.hasMore())) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}else{
			paginatorParameter.setPage(1);
		}
		ctrl.loadingItems = true;
		return $sdp.getCategories(paginatorParameter)//
		.then(function(items) {
			requests = items;
			ctrl.items = ctrl.items.concat(requests.items);
		}, function() {
			// handle error
		})//
		.finally(function(){
			ctrl.loadingItems = false;
		});
	}

	/**
	 * Reloads items. All states will be reset.
	 * 
	 * @returns promiss
	 */
	function reload(){
		requests = null;
		ctrl.items = [];
		return nextPage();
	}

	function toggleSelect(item){
		var index = _findIndex(item);
		if(index >= 0){
			ctrl.selectedItems.splice(index, 1);
			item.selected = false;
		}else{
			ctrl.selectedItems.push(item);
			item.selected = true;
		}
		$scope.$parent.setValue(ctrl.selectedItems);
	}
	
	function _findIndex(item){
		var elementPos = ctrl.selectedItems.map(function(x){return x.id;}).indexOf(item.id);
		return elementPos;
	}
	
	function isSelected(item){
		return ctrl.selectedItems && _findIndex(item) >= 0;
	}

	/*
	 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری
	 * شده است.
	 */
	$scope.items = [];
	$scope.nextPage = nextPage;
	$scope.ctrl = ctrl;
	$scope.toggleSelect = toggleSelect;
	$scope.isSelected = isSelected;

	// Pagination
	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	$scope.sortKeys= [
		'id', 
		'name',
		'creation_dtime',
		'parent_id'
	];
});
