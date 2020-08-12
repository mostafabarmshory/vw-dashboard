

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
		this.value = $scope.value;
		this.setSelected = function(item) {
			this.value = item;
			$resource.setValue(item.id);
		};
		this.isSelected = function(item) {
			return item.id === this.value;
		};
	},
	controllerAs: 'ctrl',
	tags: [AMD_SHOP_ZONE_SP + '#id', '/shop/zones#id', 'zone_id']
});