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
 * @ngdoc Controller
 * @name AmdShopZoneCtrl
 * @description Manages a zone from shop domain
 */
mblowfish.controller('AmdShopZoneCtrl', function(
    /* angularjs  */ $scope, $controller, $element,
    /* ngRoute    */ $routeParams,
    /* seen-shp   */ $shop) {

	// XXX: maso, 2020: manage ->
	//            'owner_id' => array(
	//            'member' => array( 

	// province, city, address, polygon, deleted, owner_id, modif_dtime, creation_dtime

	angular.extend(this, $controller('MbSeenAbstractItemCtrl', {
		$scope: $scope,
		$element: $element
	}));

	/**
	 * Deletes model
	 * 
	 * @param item
	 * @return promiss to delete item
	 * @memberof AmdShopZoneCtrl
	 * @see MbSeenAbstractItemCtrl
	 */
	this.deleteModel = function(item) {
		return $shop.deleteZone(item.id);
	};

	/**
	 * Gets item schema
	 * 
	 * @return promise to get schema
	 * @memberof AmdShopZoneCtrl
	 * @see MbSeenAbstractItemCtrl
	 */
	this.getModelSchema = function() {
		return $shop.zoneSchema();
	};

	/**
	 * Query and get items
	 * 
	 * @param queryParameter to apply search
	 * @return promiss to get items
	 * @memberof AmdShopZoneCtrl
	 * @see MbSeenAbstractItemCtrl
	 */
	this.getModel = function(id) {
		return $shop.getZone(id);
	};

	/**
	 * Update current item
	 * 
	 * @return promiss to add and return an item
	 * @memberof AmdShopZoneCtrl
	 * @see MbSeenAbstractItemCtrl
	 */
	this.updateModel = function(item) {
		return item.update();
	};


	this.init({
		modelId: $routeParams.zoneId,
		eventType: '/shop/zones'
	});
});


