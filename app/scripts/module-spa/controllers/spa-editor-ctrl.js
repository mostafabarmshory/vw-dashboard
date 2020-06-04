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


/**
 * @ngdoc controller
 * @name SpaCtrl
 * @description # SpaCtrl Controller of the ngMaterialDashboard
 */
mblowfish.controller('AmdTenantSpaCtrl', function(
	/* angularjs */ $window, $scope, $tenant, $state, $location) {
	/**
	 * Controller data
	 */
	var spa;

	/**
	 * Update current local changes into the backend
	 */
	this.update = function() {
		var ctrl = this;
		return this.working = spa.update()
			.then(function() {
				$window.toast('update is successfully.');
			}, function() {
				$window.alert('fail to update.');
			}).finally(function() {
				delete ctrl.working;
			});
	};

	/**
	 * درخواست مورد نظر را از سیستم حذف می‌کند.
	 * 
	 * @param request
	 * @returns
	 */
	this.remove = function() {
		var ctrl = this;
		return confirm("delete spa " + $scope.spa.id + "?")//
			.then(function() {
				return ctrl.working = spa.delete();//
			})//
			.then(function() {
				$location.path('/spas');
			}, function(error) {
				$window.alert('fail to delete spa:' + error.message);
			})//
			.finally(function() {
				delete ctrl.working;
			});
	}

	/**
	 * Load the spa
	 */
	this.load = function() {
		var ctrl = this;
		return ctrl.working = $tenant.getSpa($state.params.spaId)//
			.then(function(spaLoaded) {
				$scope.spa = spaLoaded;
				spa = spaLoaded;
				return ctrl.working = spa.getPossibleTransitions();
			})//
			.then(function(transList) {
				$scope.transitions = transList;
			})//
			.finally(function() {
				delete ctrl.working;
			});
	}

	/**
	 * تنظیم به عنوان نرم افزار پیش فرض
	 * 
	 * این نرم افزار را به عنوان نرم افزار پیش فرض تعیین می‌کند.
	 * 
	 * @returns
	 */
	this.setDefault = function() {
		var ctrl = this;
		return $tenant.getSetting('spa.default')//
			// TODO: maso, 2018: check if not exist
			.then(function(setting) {
				setting.value = spa.name;
				return setting.update();
			})//
			.then(function() {
				toast('Default SPA is changed.');
			}, function(error) {
				alert('Fail to set default spa:' + error.message);
			})//
			.finally(function() {
				ctrl.state = 'relax';
			});
	};

	/**
	 * Add given transition to SPA. In other word, do some transaction on SPA.
	 */
	this.addTransition = function(state) {
		var ctrl = this;
		var data = {};
		return this.working = spa.putTransition(state)
			.then(function() {
				return ctrl.load();
			}, function(error) {
				alert('Process failed. ' + error.message);
			})//
			.finally(function() {
				delete ctrl.working;
			});
	}

	// Load state
	this.load();
});
