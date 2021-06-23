
import Constants from '../../Constants';


export default {
	title: 'New Category',
	description: 'Creates new product/service category.',
	pages: [
		Constants.AMD_SHOP_CATEGORY_CREATE_WIZARD + '#info',
	],

	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		var data = $wizard;
		return data.title;
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		var data = $wizard.data;
		return $mbActions.exec(Constants.AMD_SHOP_CATEGORY_CREATE_ACTION, {
			values: [data]
		});
	},
}

