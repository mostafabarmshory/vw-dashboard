mblowfish.wizardPage(SDP_CATEGORY_CREATE_WIZARD + '#properties', {
	title: 'Properties',
	description: 'Category name, description and parent helps to build a useful data.',
	templateUrl: 'scripts/module-sdp/wizards/new-category/propertiesPage.html',
	controllerAs: 'ctrl',
	controller: function($scope, $wizard, $sdp, QueryParameter) {
		'ngInject';

		var queryParameter = new QueryParameter();
		queryParameter.setOrder('id', 'd');

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.name = createSetterGetter('name');
		this.slug = createSetterGetter('slug');
		this.description = createSetterGetter('description');

		//		this.parent = createSetterGetter('parent');
		$scope.$watch('ctrl.parent', function(item) {
			$wizard.setData('parent', item);
		});

		this.categorySearch = function(query) {
			queryParameter.setQuery(query);
			return $sdp.getCategories(queryParameter)
				.then(function(list) {
					return list.items;
				});
		};
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.name;
	}
});