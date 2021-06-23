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
import {
	differenceBy,
	findItemFrom
} from '../Utiles';
import MbSeenAbstractCtrl from './MbSeenAbstractCtrl';
import $mbActions from 'mblowfish/src/services/mbActions';
import QueryParameter from '../../core/QueryParameter';


var STATE_INIT = 'init';
var STATE_BUSY = 'busy';
var STATE_IDEAL = 'ideal';

/**
@ngdoc Controllers
@name MbSeenAbstractCollectionCtrl
@description Generic controller of model collection of seen

This controller is used manages a collection of a virtual items. it is the
base of all other collection controllers such as accounts, groups, etc.

There are two types of function in the controller: view and data related. All
data functions are considered to be override by extensions.

There are three categories of actions;

- view
- model
- controller

view actions are about to update view. For example adding an item into the view
or remove deleted item.

Model actions deal with model in the repository. These are equivalent to the view
actions but removes items from the storage.

However, controller function provide an interactive action to the user to performs
an action.

## Add

- addItem: controller
- addModel: model
- addViewItem: view
 */
export default class MbSeenAbstractCollectionCtrl extends MbSeenAbstractCtrl {

	constructor($scope, $q, $mbLog) {
		'ngInject';
		super($scope, $q);
		this.$mbLog = $mbLog;
		

		/**
		 * State of the controller
		 * 
		 * Controller may be in several state in the lifecycle. The state of the
		 * controller will be stored in this variable.
		 * 
		 * <ul>
		 * <li>init: the controller is not ready</li>
		 * <li>busy: controller is busy to do something (e. loading list of data)</li>
		 * <li>ideal: controller is ideal and wait for user </li>
		 * </ul>
		 * 
		 * @type string
		 * @memberof MbSeenAbstractCollectionCtrl
		 */
		this.state = STATE_INIT;

		/**
		 * Store last paginated response
		 * 
		 * This is a collection controller and suppose the result of query to be a
		 * valid paginated collection. The last response from data layer will be
		 * stored in this variable.
		 * 
		 * @type PaginatedCollection
		 * @memberof MbSeenAbstractCollectionCtrl
		 */
		this.lastResponse = null;

		/**
		 * Query parameter
		 * 
		 * This is the query parameter which is used to query items from the data
		 * layer.
		 * 
		 * @type QueryParameter
		 * @memberof MbSeenAbstractCollectionCtrl
		 */
		this.queryParameter = new QueryParameter();
		this.queryParameter.setOrder('id', 'd');

		/**
		 * List of all loaded items
		 * 
		 * All loaded items will be stored into this variable for later usage. This
		 * is related to view.
		 * 
		 * @type array
		 * @memberof MbSeenAbstractCollectionCtrl
		 */
		this.items = [];
		this.$selectedModels = [];
	}


	// -------------------------------------------------------------------------
	// Model
	//
	// We suppose that all model action be overid by the new controllers.
	//
	//
	//
	//
	// -------------------------------------------------------------------------
	/**
	 * Deletes model
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @param item
	 * @return promiss to delete item
	 */
	//  this.deleteModel = function(item){};

	/**
	 * Gets object schema
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @return promise to get schema
	 */
	//  this.getModelSchema = function(){};

	/**
	 * Query and get items
	 * 
	 * @param queryParameter to apply search
	 * @return promiss to get items
	 */
	//  this.getModels = function(queryParameter){};

	/**
	 * Get item with id
	 * 
	 * @param id of the item
	 * @return promiss to get item
	 */
	//  this.getModel = function(id){};

	/**
	 * Adds new item
	 * 
	 * This is default implementation of the data access function. Controllers
	 * are supposed to override the function
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @return promiss to add and return an item
	 */
	//  this.addModel = function(model){};



	// -------------------------------------------------------------------------
	// Controller
	//
	//
	//
	//
	//
	//
	//
	// -------------------------------------------------------------------------

	/**
	 * Reload the controller
	 * 
	 * Remove all old items and reload the controller state. If the controller
	 * is in progress, then cancel the old promiss and start the new job.
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @returns promiss to reload
	 */
	reload() {
		// safe reload
		var ctrl = this;
		function safeReload() {
			delete ctrl.lastResponse;
			ctrl.clearViewItems();
			ctrl.queryParameter.setPage(1);
			return ctrl.loadNextPage();
		}

		// check states
		if (this.isBusy()) {
			return this.getLastQeury()
				.then(safeReload);
		}
		return safeReload();
	}

	/**
	 * Loads next page
	 * 
	 * Load next page and add to the current items.
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @returns promiss to load next page
	 */
	loadNextPage() {
		// Check functions
		if (!angular.isFunction(this.getModels)) {
			throw 'The controller does not implement getModels function';
		}

		if (this.state === STATE_INIT) {
			throw 'this.init() function is not called in the controller';
		}

		// check state
		if (this.state !== STATE_IDEAL) {
			if (this.lastQuery) {
				return this.lastQuery;
			}
			throw 'Models controller is not in ideal state';
		}

		// set next page
		if (this.lastResponse) {
			if (!this.lastResponse.hasMore()) {
				return this.$q.resolve();
			}
			this.queryParameter.setPage(this.lastResponse.getNextPageIndex());
		}

		// Get new items
		this.state = STATE_BUSY;
		var ctrl = this;
		this.lastQuery = this.getModels(this.queryParameter)//
			.then(function(response) {
				ctrl.lastResponse = response;
				ctrl.addViewItems(response.items);
				// XXX: maso, 2019: handle error
				ctrl.error = null;
			}, (error) => ctrl.error = error)
			.finally(() => {
				ctrl.state = STATE_IDEAL;
				delete ctrl.lastQuery;
			});
		return this.lastQuery;
	}




	/**
	 * Generate default event handler
	 * 
	 * If you are about to handle event with a custom function, please
	 * overrid this function.
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 */
	eventHandlerCallBack() {
		if (this._eventHandlerCallBack) {
			return this._eventHandlerCallBack;
		}
		this._eventHandlerCallBack = ($event) => {
			switch ($event.key) {
				case 'create':
					this.unshiftViewItems($event.values);
					break;
				case 'update':
					this.updateViewItems($event.values);
					break;
				case 'delete':
					this.removeViewItems($event.values);
					break;
				default:
					break;
			}
		};
		return this._eventHandlerCallBack;
	}

	// -------------------------------------------------------------------------
	// View
	//
	//
	//
	//
	//
	//
	// -------------------------------------------------------------------------
	/**
	 * Adds items to view
	 * 
	 * @memberof MbSeenAbstractCollectionCtrl
	 */
	pushViewItems(items) {
		if (!angular.isDefined(items)) {
			return;
		}
		// Push new items
		differenceBy(items, this.items, 'id');
		// TODO: maso, 2019: The current version (V3.x) of lodash dose not support concat
		// update the following part in the next version.
		// this.items = _.concat(items, deff);
		items.forEach(item => this.items.push(item));
	}

	unshiftViewItems(items) {
		if (!angular.isDefined(items)) {
			return;
		}
		// Push new items
		differenceBy(items, this.items, 'id');
		// TODO: maso, 2019: The current version (V3.x) of lodash dose not support concat
		// update the following part in the next version.
		// this.items = _.concat(items, deff);
		items.forEach((item) => this.items.unshift(item));
	}

	/**
	 * Adds items to view
	 * 
	 * @memberof MbSeenAbstractCollectionCtrl
	 */
	addViewItems(...args) {
		return this.pushViewItems(...args);
	}

	/**
	 * remove item from view
	 * 
	 * @memberof MbSeenAbstractCollectionCtrl
	 */
	removeViewItems(items) {
		differenceBy(this.items, items, 'id');
		differenceBy(this.$selectedModels, items, 'id');
	};

	/**
	 * Updates an item in the view with the given one
	 * 
	 * @memberof MbSeenAbstractCollectionCtrl
	 */
	updateViewItems(items) {
		// XXX: maso, 2019: update view items
		items.forEach((item) => {
			var viewItem = findItemFrom(item, this.items);
			if (viewItem) {
				_.assign(viewItem, item);
			}
		});
	}


	/**
	 * Returns list of all items in the view
	 * 
	 * NOTE: this is the main storage of the controller.
	 * 
	 * @memberof MbSeenAbstractCollectionCtrl
	 */
	getViewItems() {
		return this.items;
	}

	/**
	 * Removes all items from view
	 * 
	 * @memberof MbSeenAbstractCollectionCtrl
	 */
	clearViewItems() {
		this.items = [];
		return this;
	}

	toggleSelection(model, $event) {
		return this.setSelected(model, !model.$selected, $event);
	}

	hasSelected() {
		return this.$selectedModels.length > 0;
	}

	selectAll() {
		var list = this.$selectedModels = [];
		this.items.forEach((item) => {
			item.$selected = true;
			list.push(item);
		});
		return this;
	}

	clearSelection() {
		this.items.forEach((item) => item.$selected = false);
		this.$selectedModels = [];
		return this;
	}

	getSelection() {
		return this.$selectedModels;
	}

	getSelectionSize() {
		return this.$selectedModels.length;
	}

	isSelected = function(model) {
		return model.$selected;
	}

	setSelected(model, selection, $event) {
		var index = this.$selectedModels.indexOf(model);
		model.$selected = selection;
		if ((selection && index > -1) || (!selection && index < 0)) {
			return;
		}
		if (model.$selected) {
			this.$selectedModels.push(model);
		} else {
			while (index > -1) {
				this.$selectedModels.splice(index, 1);
				index = this.$selectedModels.indexOf(model);
			}
		}
		try {
			if ($event) {
				$event.stopPropagation();
				$event.preventDefault();
			}
		} catch (ex) {
			this.$mbLog.error(ex);
		}
		return this;
	}


	/**
	Executes a command on models
	
	- storePath: the dispatcher path to fire changes
	- values: list of model to perform
	
	
	@memberof SeenAbstractCollectionCtrl
	@param String command id to execute
	@param SeenModel model to be delete it may be a list or array of items
	@param Event $event the source event 
	 */
	execOnModel(command, model, $event) {
		$event.storePath = this.eventType;
		if (_.isArray(model)) {
			$event.values = model;
		} else {
			$event.values = [model];
		}
		return $mbActions.exec(command, $event);
	}











	/**
	 * Loads and init the controller
	 * 
	 * All children must call this function at the end of the cycle
	 */
	init(configs) {
		configs = configs || {};
		super.init(configs);

		//			var ctrl = this;
		this.id = configs.id;
		this.state = STATE_IDEAL;
		if (!angular.isDefined(configs)) {
			return;
		}

		// DEPRECATED: enable create action
		if (configs.addAction && angular.isFunction(this.addItem)) {
			var temp = configs.addAction;
			var createAction = {
				title: temp.title || 'New item',
				icon: temp.icocn || 'add',
				action: temp.action,
			};
			if (!angular.isFunction(temp.action) && temp.dialog) {
				this._addDialog = temp.dialog;
				createAction.action = function() {
					ctrl.addItem();
				};
			}
			if (angular.isFunction(createAction.action)) {
				this.addAction(createAction);
			}
		}

		// add path
		this._setEventType(configs.eventType);

		// confirm delete
		this.deleteConfirm = !angular.isDefined(configs.deleteConfirm) || configs.deleteConfirm;
	};


	/*
	 * Listen to dispatcher for new event
	 */
	_setEventType(eventType) {
		if (this.eventType === eventType) {
			return;
		}
		var callback = this.eventHandlerCallBack();
		if (this.eventType) {
			this.removeEventHandler(callback);
		}
		this.eventType = eventType;
		this.addEventHandler(this.eventType, callback);
	}




	/**
	 * Returns last executed query
	 */
	getLastQeury() {
		return this.lastQuery;
	}

	/**
	 * Checks if the state is busy
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @returns true if the state is ideal
	 */
	isBusy() {
		return this.state === STATE_BUSY;
	}

	/**
	 * Checks if the state is ideal
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @returns true if the state is ideal
	 */
	isIdeal() {
		return this.state === STATE_IDEAL;
	}

	// -------------------------------------------------------------------------
	// Collection specification
	// -------------------------------------------------------------------------

	/**
	 * Set a GraphQl format of data
	 * 
	 * By setting this the controller is not sync and you have to reload the
	 * controller. It is better to set the data query at the start time.
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @param graphql
	 */
	setDataQuery(grqphql) {
		this.queryParameter.put('graphql', '{page_number, current_page, items' + grqphql + '}');
		// TODO: maso, 2018: check if refresh is required
	}

	/**
	 * Adding custom filter
	 * 
	 * Filters are used to select special types of the items.
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @param key of the filter
	 * @param value of the filter
	 */
	addFilter(key, value) {
		this.queryParameter.setFilter(key, value);
	}

	/**
	 * Gets the query parameter
	 * 
	 * NOTE: if you change the query parameter then you are responsible to
	 * call reload the controller too.
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @returns QueryParameter
	 */
	getQueryParameter() {
		return this.queryParameter;
	}


	/**
	 * Sets query string and reload the controller
	 * 
	 * 
	 * @memberof SeenAbstractCollectionCtrl
	 * @returns QueryParameter
	 */
	setQueryString(query) {
		this.queryParameter.setQuery(query);
		return this.reload();
	}
}
