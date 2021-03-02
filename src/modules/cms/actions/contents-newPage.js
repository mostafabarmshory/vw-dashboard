
export default {
	icon: 'add',
	title: 'CMS: New Page',
	description: 'Creates a new page',
	group: 'CMS',
	action: function($event, $mbWizard, $mbActions) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(AMD_CMS_CONTENTS_NEWPAGE_WIZARD);
		}
		return $mbActions.exec(AMD_CMS_CONTENTS_CREATE_ACTION, $event);
	},
}



