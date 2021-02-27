
mblowfish.addAction(SDP_CATEGORIES_CREATE_ACTION, {
	icon: 'add',
	title: 'SDP: New Category',
	description: 'Creates a new category',
	group: 'SDP',
	action: function($event, $sdp, $mbWizard, $q, $mbDispatcherUtil, $mbActions) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(SDP_CATEGORY_CREATE_WIZARD);
		}
		var jobs = [],
			categories = [];
		_.forEach(values, function(value) {
			var promise = $sdp
				.putCategory(value)
				.then(function(model) {
					categories.push(model);
				});
			jobs.push(promise);
		});


		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(SDP_CATEGORIES_SP, categories);
				return $mbActions.exec(SDP_CATEGORIES_EDIT_ACTION, {
					values: categories
				});
			});
	},
});