export default {
	demon: true,
	action: function($event, $amdCmsEditors) {
		'ngInject';
		var values = [];
		if($event){
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return;
		}
		var editorName = $event.editor;
		if (!_.isUndefined(editorName) && !_.isString(editorName)) {
			editorName = editorName.name;
		}
		_.forEach(values, function(content) {
			$amdCmsEditors.openContent(content, editorName);
		});
	},
}


