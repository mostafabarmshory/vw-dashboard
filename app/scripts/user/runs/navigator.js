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
angular.module('ngMaterialDashboardUser').run(function($navigator) {
	$navigator.newGroup({
		id: 'current-user',
		title: 'User',
		description: 'A module of dashboard to manage current user.',
		icon: 'person',
		priority: 1
	});
	$navigator.newItem({
		type: 'link',
		groups: ['current-user'],
		link: '/users/profile',
		title: 'Profile',
		icon: 'account_circle'
	});
	$navigator.newItem({
		type: 'link',
		groups: ['current-user'],
		link: '/users/account',
		title: 'Account',
		icon: 'account_box'
	});
	$navigator.newItem({
		type: 'link',
		groups: ['current-user'],
		link: '/users/password',
		title: 'Password',
		icon: 'fingerprint'
	});



	/**
	 * @ngdoc setting-group
	 * @name user-management
	 * @description List of user management tools
	 * 
	 * Group all user management tools under a group.
	 */
	$navigator.newGroup({
		id: 'user-management',
		title: 'User management',
		description: 'A module of dashboard to manage users.',
		icon: 'supervisor_account',
		hidden: '!app.user.tenant_owner',
		priority: 2
	});

});