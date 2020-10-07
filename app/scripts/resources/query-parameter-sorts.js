

mblowfish.addResource('seen.qp.sorts.rt', {
	tags: [SEEN_QP_SORTS_RT, SEEN_QP_RT],
	title: 'Sort editor',
	icon: 'sort',
	templateUrl: 'scripts/resources/query-parameter-sorts.html',
	controllerAs: 'ctrl',
	priority: 8,
	controller: function($scope, $value, $schema, $resource) {
		'ngInject';
		$scope.queryParameter = $value;
		$scope.schema = $schema;

		this.queryParameterChanged = function() {
			$value._init_sorts();
			$resource.setValue($value);
		};

		this.setSortValue = function(key, value){
			$value.sortMap[key] = value;
			this.queryParameterChanged();
		};

		this.addSort = function(property) {
			$value.sortMap[property.name] = 'd';
			this.queryParameterChanged();
			delete $scope.selectedProperty;
		};

		this.deleteSort = function(key) {
			delete $value.sortMap[key];
			this.queryParameterChanged();
		};

		this.deleteAllSorts = function() {
			$value.sortMap = {};
			this.queryParameterChanged();
		};
	},
});


