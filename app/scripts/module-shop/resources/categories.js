

mblowfish.addResource('/shop/categories', {
	label: 'Categories',
	templateUrl: 'views/shop/resources/categories.html',
	/*
	 * @ngInject
	 */
	controller: function($scope) {
		// TODO: maso, 2018: load selected item
		$scope.multi = true;
		this.value = $scope.value;
		this.items = {};
		this.setSelected = function(item, selected) {
			if (_.isUndefined(selected)) {
				selected = true;
			}
			item._selected = selected;
			$scope.$parent.setValue(this.getSelection());
		};
		// this._setSelected = setSelected;
		this.isSelected = function(item) {
			this.items[item.id] = item;
			return item._selected;
		};
		this.getSelection = function() {
			var selection = [];
			_.forEach(this.items, function(item) {
				if (item._selected) {
					selection.push(item);
				}
			});
			return selection;
		};
	},
	controllerAs: 'resourceCtrl',
	tags: [AMD_SHOP_CATEGORY_SP]
});