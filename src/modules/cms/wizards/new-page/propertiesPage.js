import templateUrl from './propertiesPage.html';
import Constants from '../../Constants';

export default {
	title: 'Properties',
	description: 'Each page is known with name, title and description in the Dashboard.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($wizard, $mbCrypto) {
		'ngInject';

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.name = createSetterGetter('name');
		this.title = createSetterGetter('title');
		this.description = createSetterGetter('description');
		
		this.randomName = function(){
			this.name($mbCrypto.uuid());
		};
	},
	nextPage: Constants.AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#type',
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.name;
	}
}