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
mblowfish.addView('/shop/orders-board', {
	title: 'Orders Board',
	icon: 'dashboard',
	templateUrl: 'views/shop/views/orders-board.html',
	controllerAs: 'ctrl',
	groups: ['Shop'],
	controller: function(
        /* angularjs */ $scope, $controller, $element, $scope,
        /* seen-shop */ $shop,
        /* mblowfish */ $navigator, $mbStorage) {

		var BOARD_STORAGE_KEY = '/shop/orders/board';


		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope,
			$element: $element
		}));

		// Override the function
		this.getModelSchema = function() {
			return $shop.orderSchema();
		};

		// get accounts
		this.getModels = function(parameterQuery) {
			return $shop.getOrders(parameterQuery);
		};

		// get an account
		this.getModel = function(id) {
			return $shop.getOrder(id);
		};

		// delete account
		this.deleteModel = function(model) {
			return $shop.deleteOrder(model.id);
		};


		this.loadBoard = function() {
			if (!$mbStorage[BOARD_STORAGE_KEY]) {
				this.board = {
					title: 'Shop board',
					columns: []
				}
				this.saveBoard();
			} else {
				this.board = $mbStorage[BOARD_STORAGE_KEY];
			}
			return this.board;
		};

		this.saveBoard = function() {
			$mbStorage[BOARD_STORAGE_KEY] = this.board;
		};

		this.clearBoard = function() {
			var board = this.board;
			for (var i = 0; i < board.columns.length; i++) {
				board.columns[i].items = [];
			}
			this.saveBoard();
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
				controller: 'AmdShopOrderCtrl',
				controllerAs: 'ctrl',
				templateUrl: 'views/shop/order2.html',
				config: {
					order: order
				},
				locals: {
					$state: {
						params: {
							orderId: order.id
						}
					}
				},
			});
		};

		//--------------------------------------------------------
		// --View--
		//--------------------------------------------------------
		var ctrl = this;
		var configs = {
			id: '/shop/orders/board',
			eventType: AMD_SHOP_ORDERS_SP,
		};

		this.addEventHandler(configs.id, function() {
			ctrl.updateBoard();
		});

		this.init(configs);
		this.loadBoard();
		this.loadNextPage();
	}
});