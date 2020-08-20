
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