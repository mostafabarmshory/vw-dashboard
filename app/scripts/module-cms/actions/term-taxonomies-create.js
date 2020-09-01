
mblowfish.addAction(AMD_CMS_TERMTAXONOMIES_CREATE_ACTION, {
	icon: 'add',
	title: 'New Term Taxonomy',
	description: 'Creates a new teram-taxonomy',
	groups: ['CMS'],
	action: function($event, $mbDispatcherUtil, $mbWizard, $cms, $q) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(AMD_CMS_TERMTAXONOMY_NEW_WIZARD);
		}

		var jobs = [],
			tts = [];
		_.forEach(values, function(tt) {
			var promise = $cms.putTermTaxonomy(tt)
				.then(function(newtt) {
					tts.push(newtt);
				});
			jobs.push(promise);
		});

		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(AMD_CMS_TERMTAXONOMIES_SP, tts);
			});
	},
});