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

import MbSeenAbstractItemCtrl from './MbSeenAbstractItemCtrl';


// Messages
var DELETE_MODEL_BINARY_MESSAGE = 'Delete binary content?';
var IMPLEMENT_BY_CHILDREN_ERROR = 'This method must be override in clild class';

/**
@ngdoc Controllers
@name MbSeenAbstractBinaryItemCtrl
@description Generic controller of model binary of seen

There are three categories of actions;

- view
- model
- controller

@ngInject
 */
export default class MbSeenAbstractBinaryItemCtrl extends MbSeenAbstractItemCtrl {

	constructor($scope, $q, $window, $mbRouteParams) {
		'ngInject';
		super($scope, $q, $window, $mbRouteParams)
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
	 * Deletes model binary
	 * 
	 * @param item
	 * @return promise to delete item
	 * @memberof SeenAbstractItemCtrl
	 */
	deleteModelBinary(/*item*/) {
		return this.$q.reject(IMPLEMENT_BY_CHILDREN_ERROR);
	}

	/**
	 * Upload model binary
	 * 
	 * @param item
	 * @return promise to delete item
	 * @memberof SeenAbstractItemCtrl
	 */
	uploadModelBinary(/*item*/) {
		return this.$q.reject(IMPLEMENT_BY_CHILDREN_ERROR);
	}

	/**
	 * Get model binary path
	 * 
	 * @param item
	 * @return promise to delete item
	 * @memberof SeenAbstractItemCtrl
	 */
	getModelBinaryUrl(/*item*/) {
		return this.$q.reject(IMPLEMENT_BY_CHILDREN_ERROR);
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
	//	this.itemUrl;

	/**
	 * Sets itemUrl to view
	 * 
	 * @memberof SeenAbstractBinaryItemCtrl
	 */
	setItemUrl(itemUrl) {
		this.itemUrl = itemUrl;
	}

	/**
	 * Get view itemUrl
	 * 
	 * @memberof SeenAbstractBinaryItemCtrl
	 */
	getItemUrl() {
		return this.itemUrl;
	}

	/**
	 * Deletes item binary file
	 * 
	 * @memberof SeenAbstractBinaryItemCtrl
	 */
	deleteItemBinary($event) {
		// prevent default event
		if ($event) {
			$event.preventDefault();
			$event.stopPropagation();
		}

		// update state
		var ctrl = this;
		var item = this.getItem();
		function _deleteInternal() {
			ctrl.busy = true;
			return ctrl.getModelBinaryUrl(item)
				.then(function() {
					ctrl.fireDeleted(ctrl.getModelBinaryUrl(item), item);
				}, function() {
					// XXX: maso, 2019: handle error
				})
				.finally(function() {
					ctrl.busy = false;
				});
		}

		// TODO: maso, 2018: get current promise
		// delete the item
		if (this.isConfirmationRequired()) {
			this.$window.confirm(DELETE_MODEL_BINARY_MESSAGE)
				.then(function() {
					return _deleteInternal();
				});
		} else {
			return _deleteInternal();
		}
	}
	/*
	 * Extends init method
	 */
	init(configs) {
		//		var ctrl = this;
		if (!angular.isDefined(configs)) {
			return;
		}
		this.setItemUrl(configs.url);
		this.supperInit(configs);
	};
}

