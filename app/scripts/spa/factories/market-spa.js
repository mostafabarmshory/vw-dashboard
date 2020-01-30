//Note: Hadi 1397-07-06: Use RepositorySpa factory in seen-tenant or Spa factory in seen-marketplace instead of this factory.

///*
// * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
// * 
// * Permission is hereby granted, free of charge, to any person obtaining a copy
// * of this software and associated documentation files (the "Software"), to deal
// * in the Software without restriction, including without limitation the rights
// * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// * copies of the Software, and to permit persons to whom the Software is
// * furnished to do so, subject to the following conditions:
// * 
// * The above copyright notice and this permission notice shall be included in all
// * copies or substantial portions of the Software.
// * 
// * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// * SOFTWARE.
// */
//'use strict';
//
//angular.module('ngMaterialDashboardSpa')
///**
// * @ngdoc factory
// * @memberof ngMaterialDashboardSpa
// * @name MarketSpa
// * @description 
// * 
// * # spa data model
// * 
// */
//.factory('MarketSpa', function(PObject, $pluf) {
//	var spa = function() {
//		PObject.apply(this, arguments);
//	};
//	spa.prototype = new PObject();
//
//	/**
//	 * Delete the model
//	 * 
//	 * @memberof MarketSpa
//	 * @return {promise<MarketSpa>} 
//	 */
//	spa.prototype.delete = $pluf.createDelete({
//		method : 'DELETE',
//		url : '/api/repository/:id'
//	});
//
//	/**
//	 * Update the model
//	 * 
//	 * @memberof MarketSpa
//	 * @return {promise<MarketSpa>} 
//	 */
//	spa.prototype.update =  $pluf.createUpdate({
//		method : 'POST',
//		url : '/api/repository/:id',
//	});
//	
//
//	/**
//	 * List of all states
//	 */
//	spa.prototype.states = $pluf.get({
//		url: '/api/repository/:id/states/find'
//	});
//
//	/**
//	 * 
//	 * <pre><code>
//	 * 	spa.gotState(data, state).then(function(result){});
//	 * </code></pre>
//	 */
//	spa.prototype.gotoState = $pluf.put({
//		url: '/api/repository/:id/states/{id}'
//	});
//
//	return spa;
//});
