
import Constants from '../../Constants';
export default {
	title: 'New Term',
	description: 'Creates new term.',
	pages: [
		Constants.AMD_CMS_TERM_NEW_WIZARD + '#term',
	],

	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		return $wizard.data.name && $wizard.data.slug;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		var data = $wizard.data;
		return $mbActions.exec(AMD_CMS_TERMS_CREATE_ACTION, {
			values: [data]
		});
	},
}

