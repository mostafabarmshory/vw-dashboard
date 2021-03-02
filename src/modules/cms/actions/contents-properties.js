export default {
	demon: true,
	action: function($event, $amdCmsEditors) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return;
		}
		_.forEach(values, function(content) {
			$amdCmsEditors.openProperties(content);
		});
	},
}

