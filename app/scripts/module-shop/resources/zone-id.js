

mblowfish.addResource('/shop/zones#id', {
	label: 'Zone',
	templateUrl: 'views/shop/resources/zones.html',
	/* @ngInject*/
	controller: function($scope) {
		// TODO: maso, 2018: load selected item
		$scope.multi = false;
		this.value = $scope.value;
		this.setSelected = function(item) {
			$scope.$parent.setValue(item.id);
			$scope.$parent.answer();
		};
		this.isSelected = function(item) {
			return item.id === this.value;
		};
	},
	controllerAs: 'resourceCtrl',
	priority: 8,
	tags: [AMD_SHOP_ZONE_SP + '#id', '/shop/zones#id', 'zone_id']
});