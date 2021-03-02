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
import templateUrl from './orders-board.html';
import orderDialogTemplate from './orders-board-dialog.html';
import './orders-board.css';

/**
 * @ngdoc Controllers
 * @name MbSeenShopOrdersBoardCtrl
 * @description Manages list of categories
 * 
 * 
 */
export default {
	title: 'Orders Board',
	icon: 'dashboard',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	groups: ['Shop'],
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	/*
	@ngInject
	*/
	controller: function(
        /* angularjs */ $view, $scope, $controller, $element,
        /* seen-shop */ $shop,
        /* mblowfish */ $mbDialog, $mbStorage, MbAction) {

		var BOARD_STORAGE_KEY = '/shop/orders/board';


		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));


		// Override the function
		this.getModelSchema = function() {
			return $shop.orderSchema();
		};

		// get accounts
		this.getModels = function(parameterQuery) {
			return $shop
				.getOrders(parameterQuery)
				//				.finally(()=>this.updateBoard())
				;
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
				};
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
				if (this.board.columns[i].id === id) {
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

		this.showItemDetail = function(order, $event) {
			$mbDialog
				.show({
					controller: 'AmdShopOrderCtrl',
					controllerAs: 'ctrl',
					templateUrl: orderDialogTemplate,
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
					targetEvent: $event
				});
		};

		//--------------------------------------------------------
		// --View--
		//--------------------------------------------------------
		var ctrl = this;
		$scope.$watch(() => {
			return ctrl.items.length;
		}, () => {
			ctrl.updateBoard();
		});
		this.init({
			eventType: AMD_SHOP_ORDERS_SP,
		});
		ctrl.loadBoard();
		ctrl.loadNextPage();
		$view
			.getToolbar()
			.addAction(new MbAction({
				title: 'Load more items',
				icon: 'replay_30',
				/*
				@ngInject
				*/
				action: function($event) {
					ctrl.loadNextPage($event)
				}
			}));
	}
}


