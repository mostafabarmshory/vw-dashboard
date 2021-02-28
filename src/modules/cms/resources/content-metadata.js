import Constants from '../Constants';
import templateUrl from './content-metadata.html';
export default {
	tags: [Constants.AMD_CMS_METADATA_RT],
	title: 'Metadatum',
	icon: 'label',
	controllerAs: 'ctrl',
	templateUrl: templateUrl,
	priority: 8,
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
}