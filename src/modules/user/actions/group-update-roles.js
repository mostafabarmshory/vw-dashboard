
import {findIndexById} from '../../core/Utiles';


export default {
	icon: 'save',
	title: 'Update Group Roles',
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
			group = $event.values[0],
			list = group.$roles,
			myData = group.roles,
			jobs = [];
		myData.forEach(function(item) {
			if (findIndexById(list, item) < 0) {
				jobs.push(group.putRole({
					'id': item.id,
					'role': item.id,
					'role_id': item.id
				}));
			}
		});
		list.forEach(function(item) {
			if (findIndexById(myData, item) < 0) {
				jobs.push(group.deleteRole(item));
			}
		});
		
		return $mbQueue.all(jobs)
			.finally(function() {
				// XXX: maso, 2021: must use list of roles
				$mbDispatcherUtil.fireCreated(AMD_USER_GROUPS_SP, [group]);
			});
	},
}





