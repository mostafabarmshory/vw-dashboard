
import {findIndexById} from '../../core/Utiles';


export default {
	icon: 'save',
	title: 'Update Account Groups',
	description: 'Update list of groups.',
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
			list = account.$groups,
			myData = account.groups,
			jobs = [];
		myData.forEach(function(item) {
			if (findIndexById(list, item) < 0) {
				jobs.push(account.putGroup(item));
			}
		});
		list.forEach(function(item) {
			if (findIndexById(myData, item) < 0) {
				jobs.push(account.deleteGroup(item));
			}
		});
		
		return $mbQueue.all(jobs)
			.finally(function() {
				// XXX: maso, 2021: must use list of roles
				$mbDispatcherUtil.fireCreated(AMD_USER_ACCOUNTS_SP, [account]);
			});
	},
}





