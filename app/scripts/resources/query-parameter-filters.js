
/**

Required:
- $value: the Query Parameter model
- $schema: the schema of the object model

 */
mblowfish.addResource('seen.qp.filters.rt', {
	tags: [SEEN_QP_FILTERS_RT, SEEN_QP_RT],
	title: 'Sort editor',
	icon: 'sort',
	templateUrl: 'scripts/resources/query-parameter-filters.html',
	controllerAs: 'ctrl',
	priority: 8,
	controller: function($scope, $value, $schema, $resource) {
		'ngInject';
		$scope.queryParameter = $value;
		$scope.schema = $schema;

		this.filterValuesChanged = function() {
			$value._init_filters();
			$resource.setValue($value);
		};

		this.addFilter = function(property) {
			if ($value.filterMap[property.name]) {
				return;
			}
			$value.filterMap[property.name] = [];
			this.filterValuesChanged();
		};

		this.clearFilter = function(key) {
			$value.filterMap[key] = [];
			this.filterValuesChanged();
		};

		this.deleteFilter = function(key) {
			delete $value.filterMap[key];
			this.filterValuesChanged();
		};

		this.clearFilters = function() {
			$value.filterMap = {};
			this.filterValuesChanged();
		};
	},
});


