
/**

Creates new account 

Following objects will be create for each account:

- Profile
- Roles
- Groups
- Credentials
- Avatar

Here is a sample data of a person used in the mail process.

	{
		login: 'login',
		password: 'password',
		email: 'priavate emage',
		avatar: 'JavaScript file',
		profile: {
			first_name: 'first name',
			last_name: 'last name',
		},
		roles: [{
			id: 1,
			..
		}, {
			id: 2,
			..
		}],
		groups: [{
			id: 1,
			..
		}, {
			id: 2,
			..
		}],
	}

If the values is empty in the event, then a wizard is called to gather
new data and create a new one.
 */

mblowfish.action(AMD_USER_ACCOUNT_CREATE_ACTION, {
	icon: 'new',
	title: 'New Account',
	description: 'Creates a new account and set all roles and groups.',
	groups: ['User'],
	action: function($event, $usr, $mbWizard, $q, $mbDispatcherUtil, $mbActions) {
		'ngInject';

		if (!$event.values) {
			return $mbWizard.openWizard(AMD_USER_ACCOUNT_CREATE_WIZARD);
		}

		function addRoles(account, roles) {
			if (!roles) {
				return account;
			}
			var jobs = [];
			_.forEach(roles, function(role) {
				jobs.push(account.putRole(role));
			});
			return $q.all(jobs);
		}

		function addGroups(account, groups) {
			if (!groups) {
				return account;
			}
			var jobs = [];
			_.forEach(groups, function(group) {
				jobs.push(account.putGroup(group));
			});
			return $q.all(jobs);
		}

		function setAvatar(account, avatar) {
			if (!avatar) {
				return account;
			}
			return account.uploadAvatar(avatar);
		}

		var jobs = [],
			accounts = [];

		_.forEach($event.values, function(value) {
			value = _.cloneDeep(value);
			var roles = value.roles || [];
			var groups = value.groups || [];
			var profile = value.profile || {};
			var avatar = value.avatar;

			delete value.roles;
			delete value.groups;
			delete value.profile;

			var accounts = [];
			// NOTE: profile and account will be created simultanuslly.
			// XXX: maso, 2020: unhandled types
			// ISSUES:
			// https://github.com/pluf/user/issues/12
			// https://github.com/pluf/user/issues/11
			value.type = 'no'; // email,phone
			delete value.email;
			delete value.phone;
			jobs.push($usr.putAccount(_.assign(profile, value))
				.then(function(account) {
					accounts.push(account);
					return $q.all([
						addRoles(account, roles),
						addGroups(account, groups),
						setAvatar(account, avatar)
					]);
				}));
		});

		return $q.all(jobs)
			.finally(function() {
				$mbDispatcherUtil.fireCreated(AMD_USER_ACCOUNTS_SP, accounts);
				return $mbActions.exec(AMD_USER_ACCOUNTS_OPENEDITOR_ACTION, {
					values: accounts
				});
			});
	},
});