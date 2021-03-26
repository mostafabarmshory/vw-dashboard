
import {findIndexById} from '../../core/Utiles';


export default {
	icon: 'save',
	title: 'Update Account Roles',
	description: 'Update list of roles.',
	group: 'User',
	action: function($event, $mbQueue, $mbDispatcherUtil) {
		'ngInject';

		if (!$event.values) {
			// TODO: throw error
			return;
		}

		// change roles and reload roles
		var 
			account = $event.values[0],
			list = account.$roles,
			myData = account.roles,
			jobs = [];
		myData.forEach(function(item) {
			if (findIndexById(list, item) < 0) {
				jobs.push(account.putRole({
					'id': item.id,
					'role': item.id,
					'role_id': item.id
				}));
			}
		});
		list.forEach(function(item) {
			if (findIndexById(myData, item) < 0) {
				jobs.push(account.deleteRole(item));
			}
		});
		
		return $mbQueue.all(jobs)
			.finally(function() {
				// XXX: maso, 2021: must use list of roles
				$mbDispatcherUtil.fireCreated(AMD_USER_ACCOUNTS_SP, [account]);
			});
	},
}





