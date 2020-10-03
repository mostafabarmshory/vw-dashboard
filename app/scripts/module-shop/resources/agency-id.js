

mblowfish.addResource('/shop/agency#id', {
	label: 'Agency',
	templateUrl: 'scripts/module-shop/resources/agencies.html',
	controllerAs: 'ctrl',
	tags: [AMD_SHOP_AGENCY_SP + '#id', '/shop/agencies#id', 'agency_id'],
	controller: function($scope, $controller, $resource) {
		'ngInject';
		angular.extend(this, $controller('AmdShopAgenciesCtrl', {
			$scope: $scope
		}));

		// TODO: maso, 2018: load selected item
		$scope.multi = false;
		var value = $scope.value;

		this.setSelected = function(item/*, selected*/) {
			//>> single selection
			// slect the same
			if (item === value) {
				value = undefined;
				delete item.selected;
				$resource.setValue(0);
				return;
			}
			// delete old selection
			if (value) {
				delete value.selected;
			}
			// set new value
			item.selected = true;
			value = item;
			$resource.setValue(item.id);
		};
		this.isSelected = function(item) {
			return item.selected;
		};
	},
});