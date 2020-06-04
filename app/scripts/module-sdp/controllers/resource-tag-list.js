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

/**
 * A controller to select one sdp-tag from a list of tags
 * @ngdoc controller
 * @name SdpTagListResourceCtrl
 * @description 
 * 
 */
mblowfish.controller('SdpTagListResourceCtrl', function($scope, $sdp, QueryParameter) {

	var paginatorParameter = new QueryParameter();
	paginatorParameter.setOrder('id', 'd');
	var requests = null;
	var ctrl = {
			loadingItems: false,
			items: []
	};

	/**
	 * Load next page
	 * 
	 * @returns promiss
	 */
	function nextPage() {
		if (ctrl.loadingItems) {
			return;
		}
		if (requests && !requests.hasMore()) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}else{
			paginatorParameter.setPage(1);
		}
		ctrl.loadingItems = true;
		return $sdp.getTags(paginatorParameter)//
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

	function selectItem(item){
	    ctrl.selectedId = item.id;
		$scope.$parent.setValue(item);
	}

	$scope.items = [];
	$scope.nextPage = nextPage;
	$scope.ctrl = ctrl;
	$scope.selectItem = selectItem;

	// Pagination
	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	$scope.sortKeys= [
		'id', 
		'name',
		'creation_dtime'
	];
});
