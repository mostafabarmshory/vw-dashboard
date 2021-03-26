
export default {
	icon: 'add',
	title: 'New Group',
	description: 'Creates a new group of account.',
	group: 'User',
	action: function($event, $usr, $mbWizard, $mbQueue, $mbDispatcherUtil) {
		'ngInject';

		if (!$event.values) {
			return $mbWizard.openWizard(AMD_USER_GROUP_CREATE_WIZARD);
		}

		var jobs = [],
			groups = [];

		_.forEach($event.values, function(value) {
			value = _.cloneDeep(value);
			jobs.push($usr.putGroup(value)
				.then(function(group) {
					groups.push(group);
				}));
		});

		return $mbQueue.all(jobs)
			.finally(function() {
				$mbDispatcherUtil.fireCreated(AMD_USER_GROUPS_SP, groups);
			});
	},
}



