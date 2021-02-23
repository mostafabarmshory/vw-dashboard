mblowfish.addAction(SDP_TAGS_CREATE_ACTION, {
	icon: 'add',
	title: 'SDP: New Tag',
	description: 'Creates a new tag',
	group: 'SDP',
	action: function($event, $sdp, $mbWizard, $q, $mbDispatcherUtil, $mbActions) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(SDP_TAG_CREATE_WIZARD);
		}
		var jobs = [],
			models = [];
		_.forEach(values, function(value) {
			var promise = $sdp
				.putTag(value)
				.then(function(model) {
					models.push(model);
				});
			jobs.push(promise);
		});

		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(SDP_TAGS_SP, models);
				return $mbActions.exec(SDP_TAGS_EDIT_ACTION, {
					values: models
				});
			});
	},
});