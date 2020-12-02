mblowfish.wizardPage(SDP_ASSET_CREATE_WIZARD + '#tags', {
	title: 'Properties',
	description: 'Each tag is known with name and description in the Dashboard. Fill the forme to define a new one.',
	templateUrl: 'scripts/module-sdp/wizards/new-asset/tagsPage.html',
	controllerAs: 'ctrl',
	controller: function($wizard) {
		'ngInject';

//		function createSetterGetter(key) {
//			return function(date) {
//				if (_.isUndefined(date)) {
//					return $wizard.getData(key);
//				}
//				$wizard.setData(key, date);
//			};
//		}

	},
	nextPage: function() {
		return SDP_ASSET_CREATE_WIZARD + '#file';
	}
});