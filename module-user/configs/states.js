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

angular.module('ngMaterialDashboardUser').config(function($routeProvider) {
	$routeProvider //
		/**
		 * @ngdoc Routes
		 * @name /ums/accounts
		 * @description List of users
		 * 
		 * Display and manages all system users.
		 */
		.when('/ums/accounts', {
			controller: 'AmdUserAccountsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-user-users.html',
			navigate: true,
			groups: ['user-management'],
			name: 'Users',
			icon: 'person',
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})
		/**
		 * @ngdoc Routes
		 * @name /users/new
		 * @description Create a new user
		 * 
		 */
		.when('/ums/accounts/new', {
			controller: 'AmdUserNewCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-user-user-new.html',
			groups: ['user-management'],
			name: 'New user',
			icon: 'person_add',
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})

		/**
		 * @ngdoc Routes
		 * @name /user/:id
		 * @description Details of a user
		 */
		.when('/ums/accounts/:userId', {
			templateUrl: 'views/amd-user-user.html',
			protect: true,
		})

		/**
		 * @ngdoc Routes
		 * @name /groups
		 * @description List of grops
		 */
		.when('/ums/groups', {
			templateUrl: 'views/amd-user-groups.html',
			controller: 'AmdUserGroupsCtrl',
			controllerAs: 'ctrl',
			navigate: true,
			groups: ['user-management'],
			name: 'Groups',
			icon: 'group',
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})
		/**
		 * @ngdoc Routes
		 * @name /groups/new
		 * @description Create a new group
		 */
		.when('/ums/groups/new', {
			templateUrl: 'views/amd-user-group-new.html',
			controller: 'AmdGroupNewCtrl',
			controllerAs: 'ctrl',
			// navigate : true,
			groups: ['user-management'],
			name: 'New group',
			icon: 'group_add',
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})
		/**
		 * @ngdoc Routes
		 * @name /group/:groupId
		 * @description Group detail
		 */
		.when('/ums/groups/:groupId', {
			templateUrl: 'views/amd-user-group.html',
			controller: 'AmdGroupCtrl',
			controllerAs: 'ctrl',
			protect: true,
		})
		/**
		 * @ngdoc Routes
		 * @name /roles
		 * @description List of all users
		 */
		.when('/ums/roles', {
			templateUrl: 'views/amd-user-roles.html',
			controller: 'MbSeenUserRolesCtrl',
			controllerAs: 'ctrl',
			groups: ['user-management'],
			navigate: true,
			name: 'Roles',
			icon: 'accessibility',
			/*
			 * @ngInject
			 */
			protect: function($rootScope) {
				return !$rootScope.app.user.tenant_owner;
			},
		})
		/**
		 * @ngdoc Routes
		 * @name /role/:roleId
		 * @description Detalis of a role
		 */
		.when('/ums/roles/:roleId', {
			templateUrl: 'views/amd-user-role.html',
			controller: 'AmdRoleCtrl',
			controllerAs: 'ctrl',
			protect: true,
		});
});