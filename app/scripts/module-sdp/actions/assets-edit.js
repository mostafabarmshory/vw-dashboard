
mblowfish.addAction(SDP_ASSETS_EDIT_ACTION, {
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
		_.forEach(values, function(asset, idx) {
			$timeout(function() {
				$location.path('/sdp/assets/' + asset.id);
			}, idx * 100);
		});
		return values;
	},
});