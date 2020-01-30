/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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
'use strict';

angular.module('ngMaterialDashboardJms')

/**
 * @ngdoc controller
 * @name AmdJmsPipelinesCtrl
 * @description # AmdJmsPipelinesCtrl Controller of the pipelines
 */
.controller('AmdJmsPipelinesCtrl',
function($scope, $superjms, $supertenant, $translate, $monitor, $q, 
		QueryParameter) {

	var paginatorParameter = new QueryParameter();
// paginatorParameter.addFilter('status', 'in-progress');
	var requests = null;
	var ctrl = {
		items: ['hadi']
	};

	function loadTenants(res){
		// Fetch IDs of tenants
		var idSet = new Set();
		res.items.forEach(function(value){
			idSet.add(value.tenant);			
		});
		var qp = new QueryParameter();
		idSet.forEach(function(id){
			qp.addFilter('id', id);
		});
		return $supertenant.getTenants(qp)//
		.then(function(tList){
			if(!$scope.tenants){
				$scope.tenants = [];
			}
			tList.items.forEach(function(t){
				$scope.tenants[t.id] = t;
			});
		});
	}
	
	/**
	 * لود کردن داده‌های صفحه بعد
	 * 
	 * @returns
	 */
	function nextPage() {
		if (ctrl.loadingPipelines || (requests && !requests.hasMore())) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.getNextPageIndex());
		}
		ctrl.loadingPipelines = true;
		$superjms.getPipelines(paginatorParameter)//
		.then(function(items) {
			requests = items;
			ctrl.items = ctrl.items.concat(requests.items);
			return items;
		}, function() {
			alert($translate.instant('Failed to load pipelines.'));
		})//
		.then(loadTenants, function(){
			throw 'Failed to load tenants of pipelines';
		})
		.finally(function(){
			ctrl.loadingPipelines = false;
		});
	}

	/**
	 * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
	 * 
	 * @returns
	 */
	function reload() {
		requests = null;
		ctrl.items = [];
		nextPage();
	}

	function loadStatistics(){
		ctrl.loadingStatistics = true;
		$scope.metrics = {
			'supertms.test.count': 0,
			'supertms.test_run.count': 0,
			'supertenant.tenant.count': 0,
			'supertenant.member.count': 0
		};
		var promiseList = [];
		for(var metric in $scope.metrics){
			var promise = $monitor.getMetric(metric)//
			.then(function(res){
				$scope.metrics[res.name] = res.value;
			});
			promiseList.push(promise);
		}
		$q.all(promiseList)//
		.finally(function(){
			$scope.ctrl.loadingStatistics = false;
		});
	}
	
	$scope.ctrl = ctrl;
	$scope.nextPage = nextPage;
	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	
	loadStatistics();
});

