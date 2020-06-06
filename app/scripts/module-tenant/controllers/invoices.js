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

mblowfish.controller('AmdTenantInvoicesController', function(
	$scope,
	$tenant, QueryParameter,
	$mbTranslate
) {

	var paginatorParameter = new QueryParameter();
	var requests = null;
	var ctrl = {
		items: []
	};


	/**
	 * لود کردن داده‌های صفحه بعد
	 * 
	 * @returns
	 */
	function nextPage() {
		if (ctrl.loadingInvoices || (requests && !requests.hasMore())) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}
		ctrl.loadingInvoices = true;
		$tenant.getInvoices(paginatorParameter)//
			.then(function(items) {
				requests = items;
				ctrl.items = ctrl.items.concat(requests.items);
			}, function() {
				alert($mbTranslate.instant('Failed to load invoices.'));
			})
			.finally(function() {
				ctrl.loadingInvoices = false;
			});
	}

	/**
	 * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
	 * 
	 * @returns
	 */
	function reload() {
		requests = null;
		ctrl.items = [];
		nextPage();
	}


	$scope.ctrl = ctrl;
	$scope.nextPage = nextPage;
	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	$scope.sortKeys = ['id', 'title', 'amount', 'due_dtime', 'creation_dtime'];
	$scope.sortKeysTitles = ['Id', 'Title', 'Amount', 'Due time', 'creation time'];

});


