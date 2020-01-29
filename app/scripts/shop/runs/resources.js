
angular.module('ngMaterialDashboardShop')
/**
 * دریچه‌های محاوره‌ای
 */
.run(function($resource) {
	// Resource for list of shop categories
	$resource.newPage({
		label: 'Categories',
		type: '/shop/categories',
		templateUrl: 'views/resources/amd-shop-categories.html',
		/*
		 * @ngInject
		 */
		controller: function ($scope) {
			// TODO: maso, 2018: load selected item
			$scope.multi = true;
			this.value = $scope.value;
			this.items ={};
			this.setSelected = function (item, selected) {
				if(_.isUndefined(selected)){
					selected = true;
				}
				item._selected = selected;
				$scope.$parent.setValue(this.getSelection());
			};
			// this._setSelected = setSelected;
			this.isSelected = function(item){
				this.items[item.id] = item;
				return item._selected;
			};
			this.getSelection = function(){
				var selection = [];
				_.forEach(this.items, function(item){
					if(item._selected){
						selection.push(item);
					}
				});
				return selection;
			};
		},
		controllerAs: 'resourceCtrl',
		priority: 8,
		tags: ['/shop/categories']
	});
	
	
	
	// Zone ID resource
	$resource.newPage({
	    label: 'Zone',
	    type: '/shop/zones#id',
	    templateUrl: 'views/resources/amd-shop-zones.html',
	    /*
	     * @ngInject
	     */
	    controller: function ($scope) {
            // TODO: maso, 2018: load selected item
            $scope.multi = false;
            this.value = $scope.value;
            this.setSelected = function (item) {
                $scope.$parent.setValue(item.id);
                $scope.$parent.answer();
            };
            this.isSelected = function (item) {
                return item.id === this.value;
            };
	    },
	    controllerAs: 'resourceCtrl',
	    priority: 8,
	    tags: ['/shop/zones#id', 'zone_id']
	});
});