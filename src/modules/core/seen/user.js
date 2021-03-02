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
import mblowfish from 'mblowfish';
import seen from '../../../seen'

mblowfish
	.factory('UserAccount', seen.factory({
		url: '/api/v2/user/accounts',
		resources: [{
			name: 'Group',
			factory: 'UserGroup',
			type: 'collection',
			url: '/groups'
		}, {
			name: 'Role',
			factory: 'UserRole',
			type: 'collection',
			url: '/roles'
		}, {
			name: 'Avatar',
			type: 'binary',
			url: '/avatar'
		}, {
			name: 'Email',
			factory: 'UserEmail',
			type: 'collection',
			url: '/emails'
		}, {
			name: 'Profile',
			factory: 'UserProfile',
			type: 'collection',
			url: '/profiles'
		}, {
			name: 'OAuth2Connection',
			factory: 'UserOAuth2Connection',
			type: 'collection',
			url: '/oauth2-connections'
		}, {
			name: 'Credential',
			factory: 'UserCredential',
			type: 'collection',
			url: '/credentials'
		}, {
			name: 'Token',
			factory: 'UserToken',
			type: 'collection',
			url: '/tokens'
		}]
	}))
	.factory('UserGroup', seen.factory({
		url: '/api/v2/user/groups',
		resources: [{
			name: 'Account',
			factory: 'UserAccount',
			type: 'collection',
			url: '/accounts'
		}, {
			name: 'Role',
			factory: 'UserRole',
			type: 'collection',
			url: '/roles'
		}]
	}))
	.factory('UserRole', seen.factory({
		url: '/api/v2/user/roles',
		resources: [{
			name: 'Account',
			factory: 'UserAccount',
			type: 'collection',
			url: '/accounts'
		}, {
			name: 'Group',
			factory: 'UserGroup',
			type: 'collection',
			url: '/groups'
		}]
	}))

	.factory('UserOAuth2Server', seen.factory({
		url: '/api/v2/user/oauth2-servers',
		resources: [{
			name: 'Connection',
			factory: 'UserOAuth2Connection',
			type: 'collection',
			url: '/connections'
		}]
	}))

	.factory('UserOAuth2Connection', seen.factory({
		url: '/api/v2/user/oauth2-connections',
		resources: []
	}))

	/**
	 * @ngdoc Factories
	 * @name UserMessages
	 * @description List of user messages
	 * 
	 */
	.factory('UserMessage', seen.factory({
		url: '/api/v2/user/messages',
		resources: []
	}))
	.factory('UserCredential', seen.factory({
		url: '/api/v2/user/credentials',
		resources: []
	}))
	.factory('UserToken', seen.factory({
		url: '/api/v2/user/tokens',
		resources: []
	}))

	.factory('UserProfile', seen.factory({
		url: '/api/v2/user/profiles',
		resources: []
	}))
	.factory('UserEmail', seen.factory({
		url: '/api/v2/user/emails',
		resources: []
	}))
	.service('$usr', seen.service({
		resources: [{
			name: 'Account',
			factory: 'UserAccount',
			type: 'collection',
			url: '/api/v2/user/accounts'
		}, {
			name: 'Profile',
			factory: 'UserProfile',
			type: 'collection',
			url: '/api/v2/user/profiles'
		}, {
			name: 'Group',
			factory: 'UserGroup',
			type: 'collection',
			url: '/api/v2/user/groups'
		}, {
			name: 'Role',
			factory: 'UserRole',
			type: 'collection',
			url: '/api/v2/user/roles'
		}, {
			name: 'OAuth2Server',
			factory: 'UserOAuth2Server',
			type: 'collection',
			url: '/api/v2/user/oauth2-servers'
		}, {
			name: 'Token',
			factory: 'UserToken',
			type: 'collection',
			url: '/api/v2/user/tokens'
		}, {
			name: 'Credential',
			factory: 'UserCredential',
			type: 'collection',
			url: '/api/v2/user/credentials'
		}, {
			name: 'Message',
			factory: 'UserMessage',
			type: 'collection',
			url: '/api/v2/user/messages'
		}]
	}));
