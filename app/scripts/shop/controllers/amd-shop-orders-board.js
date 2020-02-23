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
 * @ngdoc Controllers
 * @name MbSeenShopOrdersBoardCtrl
 * @description Manages list of categories
 * 
 * 
 */
angular.module('mblowfish-core').controller('MbSeenShopOrdersBoardCtrl', function(
        /* angularjs */ $scope, $controller, $element, $scope,
        /* seen-shop */ $shop,
        /* mblowfish */ $actions, $navigator) {

	angular.extend(this, $controller('MbSeenShopOrdersCtrl', {
		$scope: $scope,
		$element: $element
	}));

	this.clearBoard = function() {
		this.board = {
			title: 'Shop board',
			columns: []
		}
	};

	this.getBoardColumn = function(id) {
		for (var i = 0; i < this.board.columns.length; i++) {
			if (this.board.columns[i].id == id) {
				return this.board.columns[i];
			}
		}
		var column = {
			id: id,
			title: id,
			items: []
		};
		this.board.columns.push(column);
		return column;
	};

	this.addItemToBoard = function(item) {
		var column = this.getBoardColumn(item.state);
		column.items.push(item);
	};

	this.updateBoard = function() {
		this.clearBoard();
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			this.addItemToBoard(item);
		}
	};

	this.showItemDetail = function(order) {
		$navigator.openDialog({
			templateUrl: 'views/amd-shop-order2.html',
			config: {
				order: order
			},
			locals: {
				$routeParams: {
					orderId: order.id
				}
			},
			controller: 'AmdShopOrderCtrl',
			controllerAs: 'ctrl'
		});
	};

	//--------------------------------------------------------
	// --View--
	//--------------------------------------------------------
	var ctrl = this;
	var configs = {
		id: '/shop/orders/board',
		eventType: '/shop/orders',
		actions: [{
			title: 'New order',
			icon: 'add',
			action: function() {
				$actions.exec('create:/shop/orders');
			}
		}]
	};

	this.addEventHandler(configs.id, function() {
		ctrl.updateBoard();
	});

	this.init(configs);
	this.loadNextPage();
});