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
import mblowfish from 'mblowfish';
import Constants from './Constants';
import mblowfishIntegerateRun from './mblowfish-integerate-run';

import accountCreateAction from './actions/account-create';
import accountEditAction from './actions/account-edit';

import MbSeenUserAccountsCtrl from './controllers/MbSeenUserAccountsCtrl';
import MbSeenUserGroupsCtrl from './controllers/MbSeenUserGroupsCtrl';
import MbSeenUserMessagesCtrl from './controllers/MbSeenUserMessagesCtrl';
import MbSeenUserRolesCtrl from './controllers/MbSeenUserRolesCtrl';

import accountEditor from './editors/account';
import groupEditor from './editors/group';
import roleEditor from './editors/role';


import accountIdResource from './resources/accountId';
import accountsResource from './resources/accounts';
import groupsResource from './resources/groups';
import rolesResource from './resources/roles';

import accountView from './views/accounts';
import groupView from './views/groups';
import roleView from './views/roles';


import accountCreateWizardPage from './wizards/account-create/accountPage'
import accountCreateAvatarWizardPage from './wizards/account-create/avatarPage';
import accountCreateCredentialWizardPage from './wizards/account-create/credentialPage';
import accountCreateGroupsWizardPage from './wizards/account-create/groupsPage';
import accountCreateProfileWizardPage from './wizards/account-create/profilePage';
import accountCreateRolesWizardPage from './wizards/account-create/rolesPage';
import accountCreateWizard from './wizards/account-create/wizard';


mblowfish
	.constant(Constants)
	.run(mblowfishIntegerateRun)

	.action(AMD_USER_ACCOUNT_CREATE_ACTION, accountCreateAction)
	.action(AMD_USER_ACCOUNTS_OPENEDITOR_ACTION, accountEditAction)

	.controller('MbSeenUserAccountsCtrl', MbSeenUserAccountsCtrl)
	.controller('MbSeenUserGroupsCtrl', MbSeenUserGroupsCtrl)
	.controller('MbSeenUserMessagesCtrl', MbSeenUserMessagesCtrl)
	.controller('MbSeenUserRolesCtrl', MbSeenUserRolesCtrl)

	.editor('/ums/accounts/:accountId', accountEditor)
	.editor('/ums/groups/:groupId', groupEditor)
	.editor('/ums/roles/:roleId', roleEditor)

	.resource('amd-seen-user-account_id', accountIdResource)
	.resource('amd-seen-user-accounts', accountsResource)
	.resource('amd-seen-user-groups', groupsResource)
	.resource('amd-seen-user-roles', rolesResource)

	.view('/ums/accounts', accountView)
	.view('/ums/groups', groupView)
	.view('/ums/roles', roleView)

	.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#account', accountCreateWizardPage)
	.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#avatar', accountCreateAvatarWizardPage)
	.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#cridential', accountCreateCredentialWizardPage)
	.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#groups', accountCreateGroupsWizardPage)
	.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#profile', accountCreateProfileWizardPage)
	.wizardPage(AMD_USER_ACCOUNT_CREATE_WIZARD + '#roles', accountCreateRolesWizardPage)
	.wizard(AMD_USER_ACCOUNT_CREATE_WIZARD, accountCreateWizard)

	;
