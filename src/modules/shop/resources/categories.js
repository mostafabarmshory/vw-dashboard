
import templateUrl from './categories.html';
import Constants from '../Constants';

export default {
	label: 'Categories',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	tags: [Constants.AMD_SHOP_CATEGORY_SP],
	controller: function($scope, $controller, $resource) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('AmdShopCategoriesCtrl', {
			$scope: $scope
		}));

		// TODO: maso, 2018: load selected item
		var ctrl = this;
		//		$scope.multi = true;
		//		ctrl.value = $scope.value;

		function setSelected(item, selected) {
			if (_.isUndefined(selected)) {
				selected = true;
			}
			item._selected = selected;
			$resource.setValue(getSelection());
		}

		// this._setSelected = setSelected;
		function isSelected(item) {
			return item._selected;
		}

		function getSelection() {
			var selection = [];
			_.forEach(ctrl.items, function(item) {
				if (item._selected) {
					selection.push(item);
				}
			});
			return selection;
		}

		_.assign(ctrl, {
			getSelection: getSelection,
			isSelected: isSelected,
			setSelected: setSelected,
		});
	}
}


