'use strict';

angular.module('ngMaterialDashboardSdp')

/**
 * @ngdoc function
 * @name saasdmCpanelApp.controller:SdpCategoryCtrl
 * @description # SdpCategoryCtrl Controller of the saasdmCpanelApp
 */
.controller('SdpCategoryCtrl', function($scope, $sdp, $resource, 
		$routeParams, $location, QueryParameter) {

	var ctrl = {
			loadingCategory : true,
			loadingChilds : false,
			savingCategory : false,
			items: [],
			childs: [],
			edit: false
	};
	var category;
	var childsPP = new QueryParameter();
	childsPP.setFilter('parent_id', $routeParams.categoryId);
    var childsPaginator = null;


	function handlError(){
		alert('fail to load category');
	}

	/**
     * دسته مورد نظر را از سیستم حذف می‌کند.
     * 
     * @param request
     * @returns
     */
	function remove() {
		confirm('delete category ' + $scope.category.id + '?')//
		.then(function(){
		    return $scope.category.delete();//
		})//
		.then(function(){
			// TODO: maso, 1395: go to the model page
			$location.path('/categories');
		}, function(error){
		    alert('fail to delete category:' + error);
		});
	}

	function save(){
		ctrl.savingCategory = true;
		category.update()//
		.then(function(){
			ctrl.edit=false;
			ctrl.savingCategory = false;
		});
	}

	function nextChilds(){
	    if (ctrl.loadingChilds || ctrl.loadingCategory) {
            return false;
        }
        if (childsPaginator && !childsPaginator.hasMore()) {
            return false;
        }
        if (childsPaginator) {
            childsPP.setPage(childsPaginator.next());
        }
        ctrl.loadingChilds = true;
        $sdp.getCategories(childsPP)//
        .then(function(clist){
            childsPaginator = clist;
            ctrl.childs = ctrl.childs.concat(clist.items);
            ctrl.loadingChilds = false;
        });
    }
	
	function loadCategory(){
    	// Load category
        $sdp.getCategory($routeParams.categoryId)//
        .then(function(a){
            category = a;
            $scope.category = a;
            ctrl.loadingCategory = false;
            return a;
        }, handlError)//
        .then(nextChilds);
	}
	
	function selectParent(){
        return $resource.get('sdp-category', {
            data: ctrl.parent
        })//
        .then(function(parent){
            $scope.category.parent_id = parent.id;
        });
    }
	
	/*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
     */
	$scope.remove = remove;
	$scope.save = save;
	$scope.nextChilds = nextChilds;
	$scope.selectParent = selectParent;

	$scope.ctrl = ctrl;

	loadCategory();
});

