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
@ngdoc Controllers
@name MbAccountCtrl
@description Manages account of users.

Manages current user action:

- login
- logout
- recover pass
- login with CAS

@param {string} isProcessingLogout True if the controller is wait for logout
@param {string} isProcessingLogin True if the controller is wait for login

 */
mblowfish.controller('MbAccountContainerCtrl', function(
	/* Angularjs */ $scope, $mbTranslate, $usr,
	/* MBlowfish */ $mbAccount, $mbLogger) {


	// support old systems
	var ctrl = this;


	/**
	 Call login process for current user
	 
	 @memberof MbAccountContainerCtrl
	 @name login
	 @param {object} cridet Username, password, token and others required in login
	 @param {string} cridet.login Login name of the user
	 @param {stirng} cridet.password Password ot the user
	 @param {stirng} cridet.token Token to use in the login
	 @param {stirng} cridet.captcha captcah to send
	 @returns {promiss} TO do the login
	 */
	function login(cridet) {
		if (ctrl.isProcessingLogin) {
			return false;
		}
		return ctrl.isProcessingLogin = $mbAccount.login(cridet)
			.catch(function(error) {
				// TODO: maso, 2020: chanage state to error
			})
			.finally(function() {
				delete ctrl.isProcessingLogin;
			});
	}

	function logout() {
		if (ctrl.isProcessingLogout) {
			return false;
		}
		return ctrl.isProcessingLogout = $mbAccount.logout()//
			.catch(function(error) {
				// TODO: maso, 2020: chanage state to error
			})
			.finally(function() {
				delete ctrl.isProcessingLogout;
			});
	}

	/**
	 Creates a new request to recover password
	 
	 @name load
	 @memberof MbAccountCtrl
	 @returns {promiss} to change password
	 */
	function recoverPasswrodRequest(data) {
		if (ctrl.changingPassword) {
			return;
		}
		ctrl.changingPassword = true;
		var param = {
			'old': data.oldPass,
			'new': data.newPass,
			'password': data.newPass
		};
		// return $usr.resetPassword(param)//
		$usr.putCredential(param)
			.then(function() {
				$mbAccount.logout();
				ctrl.changePassState = 'success';
				$scope.changePassMessage = null;
				toast($mbTranslate.instant('Password is changed successfully. Login with new password.'));
			}, function(error) {
				ctrl.changePassState = 'fail';
				$scope.changePassMessage = $mbLogger.errorMessage(error, form);
				alert($mbTranslate.instant('Failed to change the password.'));
			})//
			.finally(function() {
				ctrl.changingPassword = false;
			});
	}


	//-----------------------------------------------------------------
	// END
	//-----------------------------------------------------------------
	$scope.credit = {};
	_.assign(ctrl, {
		login: login,
		logout: logout,
		recoverPasswrodRequest: recoverPasswrodRequest,
	});
});


