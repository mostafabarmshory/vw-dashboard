
mblowfish.resource('cms.term-taxonomies', {
	tags: [AMD_CMS_TERMTAXONOMIES_RT],
	title: 'Term-Taxonomy',
	icon: 'label',
	templateUrl: 'scripts/module-cms/resources/term-taxonomy.html',
	controllerAs: 'ctrl',
	priority: 8,
	controller: function($scope, $resource, $controller) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbSeenCmsTermTaxonomiesCtrl', {
			$scope: $scope
		}));
		
		$scope.multi = false;
		var value = [];

		this.toggleSelected = function(item) {
			if (this.isSelected(item)) {
				var index = value.indexOf(item);
				value.splice(index, 1);
			} else {
				value.push(item);
			}
			$resource.setValue(value);
		};

		this.isSelected = function(item) {
			return value.indexOf(item) >= 0;
		};
	},
});