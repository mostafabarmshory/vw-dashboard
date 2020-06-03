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
 * @name AmdShopAgencyCtrl
 * @description Manages an agency from shop domain
 */
mblowfish.controller('AmdShopAgencyCtrl', function(
    /* angularjs  */ $scope, $controller, $element,
    /* ngRoute    */ $routeParams,
    /* seen-shp   */ $shop,
    /* mblowfish  */ $actions) {

    angular.extend(this, $controller('MbSeenAbstractItemCtrl', {
        $scope : $scope,
        $element: $element
    }));

    // delete model
	this.deleteModel = function(item){
		return $shop.deleteAgency(item.id);
	};

	// get model schema
	this.getModelSchema = function(){
		return $shop.agencySchema();
	};

	// get model
	this.getModel = function(id){
		return $shop.getAgency(id);
	};

	// update model
	this.updateModel = function(item){
		return item.update();
	};


    this.init({
        eventType: '/shop/agencies'
    });
});


