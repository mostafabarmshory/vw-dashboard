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
 */
mblowfish.controller('AmdTenantTicketsController', function($scope, $tenant, $navigator, QueryParameter) {

	var paginatorParameter = new QueryParameter();
	var requests = null;
	var ctrl = {
		state: 'relax',
		items: []
	};

    /**
     * لود کردن داده‌های صفحه بعد
     * 
     * @returns
     */
	function nextPage() {
		if (ctrl.status === 'working') {
			return;
		}
		if (requests && !requests.hasMore()) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}
		// start state (device list)
		ctrl.status = 'working';
		$tenant.getTickets(paginatorParameter)//
			.then(function(items) {
				requests = items;
				ctrl.items = ctrl.items.concat(requests.items);
				ctrl.status = 'relax';
			}, function(error) {
				ctrl.status = 'fail';
				ctrl.error = error;
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

    /**
     * Adds new ticket
     * 
     * @memberof AmdTenantTicketsController
     */
	function add() {
		// get subject of new ticket
		return $navigator.openDialog({
			templateUrl: 'views/dialogs/subject.html',
			model: {
				subject: 'subject'
			}
		})
			.then(function(subject) {
				return $tenant.putTicket({
					subject: subject
				})//
			})
			.then(function(ticket) {
				$navigator.openPage('tenant/tickets/' + ticket.id);
			});//
	}
	;
	function remove() { }
	function open() { }


    /*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری
     * شده است.
     */
	$scope.items = [];
	$scope.nextPage = nextPage;
	$scope.ctrl = ctrl;

	$scope.add = add;
	$scope.remove = remove;
	$scope.open = open;

	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	$scope.sortKeys = ['id', 'creation_dtime'];
	$scope.moreActions = [{
		title: 'New ticket',
		icon: 'add',
		action: add
	}];
});
