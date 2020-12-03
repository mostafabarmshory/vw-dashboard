

mblowfish.wizard(SDP_CATEGORY_CREATE_WIZARD, {
	title: 'New Category',
	description: 'Creates new category of products to categorize and manage larg list of them.',
	pages: [
		SDP_CATEGORY_CREATE_WIZARD + '#properties',
		// TODO: add extra pages
	],

	/*
	Validate data on changes
	*/
	onChange: function() {
		'ngInject';
		// TODO:
	},
	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		// TODO
		return $wizard.data.name;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		var parent = $wizard.data.parent;
		if (parent) {
			$wizard.data.parent_id = parent.id;
		}
		delete $wizard.data.parent;
		return $mbActions.exec(SDP_CATEGORIES_CREATE_ACTION, {
			values: [$wizard.data]
		});
	},
});


