
import * as Constants from '../../Constants';

export default {
	title: 'New Term-Taxonomy',
	description: 'Creates new Term-Taxonomy.',
	pages: [
		Constants.AMD_CMS_TERMTAXONOMY_NEW_WIZARD + '#term-taxonomy',
	],

	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		return $wizard.data.taxonomy && $wizard.data.term_id;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		var data = $wizard.data;
		return $mbActions.exec(AMD_CMS_TERMTAXONOMIES_CREATE_ACTION, {
			values: [data]
		});
	},
}


