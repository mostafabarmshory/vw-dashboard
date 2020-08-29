

mblowfish.addResource('/shop/zones#id', {
	label: 'Zone',
	templateUrl: 'scripts/module-shop/resources/zones.html',
	controller: function($scope, $controller, $resource) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('AmdShopZonesCtrl', {
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
				$resource.setValue(undefined);
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
	controllerAs: 'ctrl',
	tags: [AMD_SHOP_ZONE_SP + '#id', '/shop/zones#id', 'zone_id']
});