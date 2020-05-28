/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
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

angular.module('ngMaterialDashboardSpa')

/**
 * 
 */
.controller('amdRepositorySpaCtrl', function($scope, $routeParams, $tenant) {

	/**
	 * Load the spa
	 */
	function load() {
		$scope.working = $tenant.getRepositorySpa($routeParams.spaId)//
		.then(function(spa){
			$scope.spa = spa;
			return $scope.spa.getPossibleTransitions();
		})//
		.then(function(states){
			$scope.states = states.items;
		})//
		.finally(function(){
			$scope.working = false;
		});
		return $scope.working;
	}

	/**
	 * Go to the new state.
	 */
	function gotoState(state){
		if($scope.working){
			return;
		}
		// Load data for state
		return $scope.working = $scope.spa.putTransition(state)//
		.then(function(){
			toast('Process done successfully.');
		}, function(){
            alert('Process failed.');
		})//
		.finally(function(){
		    $scope.working = false;
		});
	}

	/*
	 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری
	 * شده است.
	 */
	$scope.gotoState = gotoState;

	load();
});
