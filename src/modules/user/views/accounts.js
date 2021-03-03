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

import templateUrl from './accounts.html';

/**
 * @ngdoc controller
 * @name AmdUserAccountsCtrl
 * @description Manages list of accounts
 */
export default {
	controllerAs: 'ctrl',
	templateUrl: templateUrl,
	groups: ['Users Management'],
	title: 'Users',
	icon: 'person',
	controller: function($scope, $controller, $mbActions, $usr, $view) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Overried the function
		this.getModelSchema = function() {
			return $usr.accountSchema();
		};

		// get accounts
		this.getModels = function(parameterQuery) {
			return $usr.getAccounts(parameterQuery);
		};

		// get an account
		this.getModel = function(id) {
			return $usr.getAccount(id);
		};

		// add account
		this.addModel = function(model) {
			return $usr.putAccount(model);
		};

		// delete account
		this.deleteModel = function(model) {
			return $usr.deleteAccount(model.id);
		};


		this.editAccount = function($event, account) {
			$event.values = [account];
			return $mbActions.exec(AMD_USER_ACCOUNTS_OPENEDITOR_ACTION, $event);
		};

		this.init({
			eventType: AMD_USER_ACCOUNTS_SP
		});
	}
}



