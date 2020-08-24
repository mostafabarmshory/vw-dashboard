
mblowfish.addResource('cms.metadata.keyval', {
	tags: [AMD_CMS_METADATA_RT],
	title: 'Metadatum',
	icon: 'label',
	controller: function($scope, $value, $resource) {
		'ngInject';
		var value = _.isArray($value) ? $value : [{}];
		$scope.meta = value[0];
		$scope.setKey = function(key) {
			value[0].key = key;
			$resource.setValue(value);
		};
		$scope.setValue = function(val) {
			value[0].value = val;
			$resource.setValue(value);
		};
	},
	controllerAs: 'ctrl',
	templateUrl: 'views/resources/amd-cms-microdatum.html',
	priority: 8
});