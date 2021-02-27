
mblowfish.addAction(SDP_CATEGORIES_EDIT_ACTION, {
	demon: true,
	action: function($event, $location, $timeout) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return;
		}
		_.forEach(values, function(model, idx) {
			$timeout(function() {
				$location.path('/sdp/categories/' + model.id);
			}, idx * 100);
		});
		return values;
	},
});