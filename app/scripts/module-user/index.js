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
mblowfish.config(function($mbIconProvider, $mbEditorProvider, $mbViewProvider) {
	$mbIconProvider
		.addShape('amd-account', $mbIconProvider.getShape('person'))
		.addShape('amd-profile', $mbIconProvider.getShape('person'));



	$mbEditorProvider
		.addEditor('/ums/accounts/:userId', {
			templateUrl: 'views/amd-user-user.html',
		})
		.addEditor('/ums/groups/:groupId', {
			templateUrl: 'views/amd-user-group.html',
			controller: 'AmdGroupCtrl',
			controllerAs: 'ctrl',
			protect: true,
		})
		.addEditor('/ums/roles/:roleId', {
			templateUrl: 'views/amd-user-role.html',
			controller: 'AmdRoleCtrl',
			controllerAs: 'ctrl',
			protect: true,
		});


	var viewGroups = ['Users&Security'];


	$mbViewProvider
		.addView('/ums/accounts', {
			controller: 'AmdUserAccountsCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-user-users.html',
			groups: viewGroups,
			title: 'Users',
			icon: 'person',
		})
		.addView('/ums/accounts/new', {
			controller: 'AmdUserNewCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/amd-user-user-new.html',
			groups: viewGroups,
			title: 'New user',
			icon: 'person_add',
		})
		.addView('/ums/groups', {
			templateUrl: 'views/amd-user-groups.html',
			controller: 'AmdUserGroupsCtrl',
			controllerAs: 'ctrl',
			groups: viewGroups,
			title: 'Groups',
			icon: 'group',
		})
		.addView('/ums/groups-new', {
			templateUrl: 'views/amd-user-group-new.html',
			controller: 'AmdGroupNewCtrl',
			controllerAs: 'ctrl',
			groups: viewGroups,
			title: 'New group',
			icon: 'group_add',
		})
		.addView('/ums/roles', {
			templateUrl: 'views/amd-user-roles.html',
			controller: 'MbSeenUserRolesCtrl',
			controllerAs: 'ctrl',
			groups: viewGroups,
			title: 'Roles',
			icon: 'accessibility',
		})
});
