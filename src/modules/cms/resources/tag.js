import Constants from '../Constants';
import templateUrl from './tag.html';

export default {
	tags: [Constants.AMD_CMS_TERMTAXONOMIES_RT],
	title: 'Tag',
	icon: 'label',
	controllerAs: 'ctrl',
	priority: 8,
	templateUrl: templateUrl,
	controller: function($scope, $resource, $controller) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbCmsTermTaxonomiesCtrl', {
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
}