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

import MbSeenAbstractCtrl from './MbSeenAbstractCtrl';

// Messages
var DELETE_MODEL_MESSAGE = 'Delete the item?';
//	var LOAD_ACTION_FAIL_MESSAGE = 'Fail to load item';
var IMPLEMENT_BY_CHILDREN_ERROR = 'This method must be override in clild class';

/**
@ngdoc Controllers
@name MbSeenAbstractItemCtrl
@description Generic controller of item of seen

There are three categories of actions;

- view
- model
- controller

@ngInject
 */
export default class MbSeenAbstractItemCtrl extends MbSeenAbstractCtrl {


	constructor($scope, $q, $window, $mbRouteParams) {
		'ngInject';
		super($scope, $q);
		this.$window = $window;
		this.$mbRouteParams = $mbRouteParams;


		/*
		 * Extra actions
		 */
		this.actions = [];

		/**
		 * Is true if the controller is busy
		 * 
		 * @type boolean
		 * @memberof SeenAbstractItemCtrl
		 */
		this.busy = false;

		/**
		 * Is true if the controller is dirty
		 * 
		 * The controller is dirty if and only if a property of the item is changed by 
		 * the view.
		 * 
		 * @type boolean
		 * @memberof SeenAbstractItemCtrl
		 */
		this.dirty = false;
	}


	// -------------------------------------------------------------------------
	// Model
	//
	// We suppose that all model action be override by the new controllers.
	//
	//
	//
	//
	// -------------------------------------------------------------------------
	/**
	 * Deletes model
	 * 
	 * @param item
	 * @return promiss to delete item
	 * @memberof SeenAbstractItemCtrl
	 */
	deleteModel(/*item*/) {
		return this.$q.reject(IMPLEMENT_BY_CHILDREN_ERROR);
	}

	/**
	 * Gets item schema
	 * 
	 * @return promise to get schema
	 * @memberof SeenAbstractItemCtrl
	 */
	getModelSchema() {
		return this.$q.reject(IMPLEMENT_BY_CHILDREN_ERROR);
	}

	/**
	 * Query and get items
	 * 
	 * @param queryParameter to apply search
	 * @return promiss to get items
	 * @memberof SeenAbstractItemCtrl
	 */
	getModel(/*id*/) {
		return this.$q.reject(IMPLEMENT_BY_CHILDREN_ERROR);
	}

	/**
	 * Update current model
	 * 
	 * @memberof SeenAbstractItemCtrl
	 * @return promiss to add and return an item
	 */
	updateModel(/*model*/) {
		return this.$q.reject(IMPLEMENT_BY_CHILDREN_ERROR);
	}


	// -------------------------------------------------------------------------
	// View
	//
	//  Actions used in item view and manage the loaded item. To desinge a page 
	// you must use following API.
	//
	// -------------------------------------------------------------------------
	/**
	 * Current manged item 
	 * 
	 * @type Object
	 * @memberof SeenAbstractItemCtrl
	 */
	//	this.item;
	//	this.itemId;

	/**
	 * Sets item to view
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	setItem(item) {
		this.item = item;
	}

	/**
	 * Get view item
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	getItem() {
		return this.item;
	}

	/**
	 * Gets id of the view item
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	getItemId() {
		return this.itemId;
	}

	/**
	 * Sets id of the view item
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	setItemId(itemId) {
		this.itemId = itemId;
	}

	/**
	 * Reload item by its ID
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	loadItem() {
		return this.getModel(this.itemId)
			.then(
				(item) => this.setItem(item),
				(/*error*/) => this.$window.alert('Fail to load the item ' + this.getItemId()));
	}

	setLastPromis(p) {
		this.__lastPromis = p;
	}

	getLastPromis() {
		return this.__lastPromis;
	}

	/**
	 * Checks if the state of the controller is busy
	 * 
	 * @return {boolean} true if the controller is busy
	 * @memberof SeenAbstractItemCtrl
	 */
	isBusy() {
		return this.busy;
	}

	/**
	 * Checks if the state of the controller is dirty
	 * 
	 * @return {boolean} true if the controller is dirty
	 * @memberof SeenAbstractItemCtrl
	 */
	isDirty() {
		return this.dirty;
	}

	/**
	 * Check if confirmation is required for critical tasks
	 * 
	 * @return {boolean} true if the confirmation is required
	 * @memberof SeenAbstractItemCtrl
	 */
	isConfirmationRequired() {
		return this.confirmationRequired;
	}

	/**
	 * Set confirmation
	 * 
	 * @params confirmationRequired {boolean}
	 * @memberof SeenAbstractItemCtrl
	 */
	setConfirmationRequired(confirmationRequired) {
		this.confirmationRequired = confirmationRequired;
	}

	updateItem($event) {
		// prevent default event
		if ($event) {
			$event.preventDefault();
			$event.stopPropagation();
		}

		// XXX: maso, 2019: update state
		var ctrl = this;

		var job = this.updateModel(ctrl.item)
			.then(function(item) {
				ctrl.fireUpdated(ctrl.eventType, item);
			});
		// TODO: maso, 2020: add job tos list
		return job;
	}

	/**
	 * Creates new item with the createItemDialog
	 */
	deleteItem($event) {
		// prevent default event
		if ($event) {
			$event.preventDefault();
			$event.stopPropagation();
		}

		// XXX: maso, 2019: update state
		var ctrl = this;
		// var tempItem = _.clone(item);
		function _deleteInternal() {
			ctrl.busy = true;
			return ctrl.deleteModel(ctrl.item)
				.then(function() {
					ctrl.fireDeleted(ctrl.eventType, ctrl.item);
				})
				.finally(function() {
					ctrl.busy = false;
				});
		}
		// delete the item
		if (this.isConfirmationRequired()) {
			this.$window.confirm(DELETE_MODEL_MESSAGE)
				.then(function() {
					return _deleteInternal();
				});
		} else {
			return _deleteInternal();
		}
	}

	/**
	 * Reload the controller
	 * 
	 * 
	 * @memberof SeenAbstractItemCtrl
	 * @returns promise to reload
	 */
	reload() {
		// safe reload
		var ctrl = this;
		function safeReload() {
			ctrl.setItem(null);
			return ctrl.loadItem(ctrl.getItemId());
		}

		// attache to old promise
		if (this.isBusy()) {
			return this.getLastPromis()
				.then(safeReload);
		}

		// create new promise
		var promise = safeReload();
		this.setLastPromis(promise);
		return promise;
	}

	/**
	 * Set a GraphQl format of data
	 * 
	 * By setting this the controller is not sync and you have to reload the
	 * controller. It is better to set the data query at the start time.
	 * 
	 * @memberof SeenAbstractItemCtrl
	 * @param graphql
	 */
	setDataQuery(grqphql) {
		this.queryParameter.put('graphql', grqphql);
		// TODO: maso, 2018: check if refresh is required
	}

	/**
	 * Generate default event handler
	 * 
	 * If you are about to handle event with a custom function, please
	 * override this function.
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	eventHandlerCallBack() {
		if (this._eventHandlerCallBack) {
			return this._eventHandlerCallBack;
		}
		var ctrl = this;
		this._eventHandlerCallBack = ($event) => {
			switch ($event.key) {
				case 'updated':
					ctrl.updateViewItems($event.values);
					break;
				case 'removed':
					ctrl.removeViewItems($event.values);
					break;
				default:
					break;
			}
		};
		return this._eventHandlerCallBack;
	}

	/**
	 * Sets controller event type
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	setEventType(eventType) {
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


	//	this.seen_abstract_item_supperInit = this.init;
	/**
	 * Loads and init the controller
	 * 
	 * NOTE: All children must call this function at the end of the cycle
	 * 
	 * Properties:
	 * 
	 * - confirmation: show confirmation dialog
	 * - eventType: type of the events
	 * - dataQuery: a query to data
	 * - modelId:
	 * - model
	 * 
	 * @memberof SeenAbstractItemCtrl
	 */
	init(configs) {
		super.init(configs);
		//		var ctrl = this;
		if (!angular.isDefined(configs)) {
			return;
		}

		// add path
		this.setEventType(configs.eventType);

		// confirm delete
		this.setConfirmationRequired(!angular.isDefined(configs.confirmation) || configs.confirmation);

		// data query
		if (configs.dataQuery) {
			this.setDataQuery(configs.dataQuery);
		}

		// model id
		this.setItemId(configs.modelId || $mbRouteParams.itemId);

		// Modl
		if (configs.model) {
			// TODO: load model
		}

		return this.reload();
	}

}


