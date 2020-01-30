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
 * @ngdoc controller
 * @name SpaCtrl
 * @description # SpaCtrl Controller of the ngMaterialDashboard
 */
.controller('amdSpaCtrl', function ($scope, $tenant, $routeParams, $location, $http, $navigator) {
	/**
	 * Controller data
	 */
	$scope.ctrl = {
		state: 'relax'
	};
	var ctrl = $scope.ctrl;

	/**
	 * Update current local changes into the backend
	 */
	function update(){
		ctrl.state = 'working';
		return $scope.spa.update()
		.then(function(){
			alert('update is successfully.');
		}, function(error){
			alert('fail to update.');
		})//
		.finally(function(){
			ctrl.state = 'relax';
		});
	}
	
	/**
	 * Update name of the spa
	 */
	function updateName(){
		return confirm("Name of an spa directly effect into the SEO and cause fail in update process. Change spa name?")//
		.then(function(){
			ctrl.state = 'working';
			return $scope.spa.update();//
		})//
		.finally(function(){
			ctrl.state = 'relax';
		});
	}
	
	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	function remove() {
		return confirm("delete spa " + $scope.spa.id +"?")//
		.then(function(){
			ctrl.state = 'working';
			return $scope.spa.delete();//
		})//
		.then(function(){
			$location.path('/spas');
		}, function(error){
			alert('fail to delete spa:' + error.message);
		})//
		.finally(function(){
			ctrl.state = 'relax';
		});
	}

	/**
	 * Load the spa
	 */
	function load() {
		ctrl.state = 'working';
		return $tenant.getSpa($routeParams.spaId)//
		.then(function(spa){
			$scope.spa = spa;
			return $scope.spa.getPossibleTransitions();
		}, function(error){
		    if(error.status === 404){
		        $navigator.openPage('spas');
		    }
			ctrl.error = error;
		})//
		.then(function(transList){
			ctrl.error = null;
			$scope.transitions = transList;
		})//
		.finally(function(){
			ctrl.state = 'relax';
		});
	}

	/**
	 * تنظیم به عنوان نرم افزار پیش فرض
	 * 
	 * این نرم افزار را به عنوان نرم افزار پیش فرض تعیین می‌کند.
	 * 
	 * @returns
	 */
	function setDefault(){
		ctrl.state = 'working';
		return $tenant.getSetting('spa.default')//
		// TODO: maso, 2018: check if not exist
		.then(function(setting){
			setting.value = $scope.spa.name;
			return setting.update();
		})//
		.then(function(){
			toast('Default SPA is changed.');
		},function(error){
			alert('Fail to set default spa:'+error.message);
		})//
		.finally(function(){
			ctrl.state = 'relax';
		});
	}

	/**
	 * Add given transition to SPA. In other word, do some transaction on SPA.
	 */
	function addTransition(state){
		if(ctrl.state !== 'relax'){
			return;
		}
		ctrl.state = 'working';
		// Load data for state
		var data = {}; 
//		$http.put('/api/spa/'+$scope.spa.id+'/states/'+state.id, data)//
		$scope.spa.putTransition(state)
		.then(function(){
			return load();
		}, function(error){
			ctrl.error = error;
			alert('Process failed. ' + error.message);
		})//
		.finally(function(){
			ctrl.state = 'relax';
		});
	}
	
	function deleteSpa (){
        if(ctrl.state !== 'relax'){
            return;
        }
        ctrl.state = 'working';
        confirm('Delete the SPA?')
        .then(function(){
            $scope.spa.delete()
            .then(function(){
                $navigator.openPage('spas');
            }, function(error){
                ctrl.error = error;
                alert('Failed to delete: ' + error.message);
            })//
        })
        .finally(function(){
            ctrl.state = 'relax';
        });
	}

	// Load state
	$scope.setDefault = setDefault;
	$scope.remove = remove;
	$scope.update = update;
	$scope.updateName = updateName;
	$scope.addTransition = addTransition;
	$scope.deleteSpa = deleteSpa;
	load();
});
