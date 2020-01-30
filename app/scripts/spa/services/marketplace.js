//Note: Hadi 1397-07-06: Use $marketplace in seen-marketplace instead of this service.

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
// * @ngdoc service
// * @name $marketplace
// * @memberof ngMaterialDashboardSpa
// * @description 
// * 
// * # marketplace
// * 
// */
//.service('$marketplace', function($http, PObjectCache, $pluf, MarketSpa) {
//
//	var _spas = new PObjectCache(function(data) {
//		return new MarketSpa(data);
//	});
//
//
//	/**
//	 * List spas
//	 * 
//	 * @memberof $marketplace
//	 * @return {permision(PaginatedPage<MarketSpa>)} list of spas
//	 */
//	this.spas = $pluf.createFind({
//		url : '/api/repository/find',
//	}, _spas);
//
//	/**
//	 * Get an spa
//	 * 
//	 * @memberof $marketplace
//	 * @param {object} id of the spa
//	 * @return {promise<marketplacespa>} the spa
//	 */
//	this.spa = $pluf.createGet({
//		method: 'GET',
//		url : '/api/repository/{id}',
//	}, _spas);
//
//
//	/**
//	 * Creates new spa
//	 * 
//	 * @memberof $marketplace
//	 * @param {Struct} data of an spa
//	 * @return {promise<marketplacespa>} created one
//	 */
//	this.newSpa = $pluf.post({
//		url : '/api/repository/new',
//	}, _spas);
//
//});