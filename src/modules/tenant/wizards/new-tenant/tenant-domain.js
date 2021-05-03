import templateUrl from './tenant-domain.html';
export default {
	title: 'Tenant Domains',
	description: 'To access the tenant you can set a domin.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($wizard) {
		'ngInject';

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.domain = createSetterGetter('domain');
		this.subdomain = createSetterGetter('subdomain');
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.domain;
	}
}

