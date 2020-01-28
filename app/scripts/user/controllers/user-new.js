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
'use strict';

angular.module('ngMaterialDashboardUser')

/**
 * @ngdoc controller
 * @name AmdUserNewCtrl
 * @description Creates new user
 */
.controller('AmdUserNewCtrl', function($scope, $usr, $navigator, $errorHandler) {

	/*
	 * View controller options
	 */
	var ctrl = {
			working: false
	};

	function cancel() {
		$navigator.openPage('ums/accounts');
	}

	function addUser(model) {
		ctrl.working = true;
		$usr.putAccount(model)//
		.then(function(/* user */) {
			$navigator.openPage('ums/accounts');
			$scope.errorMessage = null;
		}, function(error) {
			$scope.errorMessage = $errorHandler.handleError(error, ctrl.myForm);
		})//
		.finally(function(){
			ctrl.working = false;
		});
	}
	
	$scope.cancel = cancel;
	$scope.addUser = addUser;
	$scope.ctrl = ctrl;
});
