mblowfish.addAction(SDP_DRIVES_CREATE_ACTION, {
	icon: 'add',
	title: 'SDP: New Storage',
	description: 'Creates a new storage of assets',
	group: 'SDP',
	action: function($event, $sdp, $mbWizard, $q, $mbDispatcherUtil, $mbActions) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(SDP_DRIVE_CREATE_WIZARD);
		}
		var jobs = [],
			models = [];
		_.forEach(values, function(value) {
			var promise = $sdp
				.putDrive(value)
				.then(function(model) {
					models.push(model);
				});
			jobs.push(promise);
		});


		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(SDP_DRIVES_SP, models);
				return $mbActions.exec(SDP_DRIVES_EDIT_ACTION, {
					values: models
				});
			});
	},
});