
export default {
	icon: 'add',
	title: 'CMS: New Term',
	description: 'Creates a new teram',
	group: 'CMS',
	action: function($event, $mbDispatcherUtil, $mbWizard, $cms, $q) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(AMD_CMS_TERM_NEW_WIZARD);
		}

		var jobs = [],
			terms = [];
		_.forEach(values, function(term) {
			var promise = $cms.putTerm(term)
				.then(function(newTerm) {
					terms.push(newTerm);
				});
			jobs.push(promise);
		});

		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(AMD_CMS_TERMS_SP, terms);
			});
	},
}


