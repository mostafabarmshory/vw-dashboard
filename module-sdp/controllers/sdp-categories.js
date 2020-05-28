'use strict';

angular.module('ngMaterialDashboardSdp')

/**
 * @ngdoc function
 * @name saasdmCpanelApp.controller:SdpCategoriesCtrl
 * @description # SdpCategoriesCtrl Controller of the saasdmCpanelApp
 */
.controller('SdpCategoriesCtrl', function($scope, $sdp, $navigator, QueryParameter) {

    var paginatorParameter = new QueryParameter();
    paginatorParameter.setOrder('id', 'd');
    paginatorParameter.setFilter('parent_id', '0');
    var requests = null;
    var ctrl = {
        loading: false,
        items: []
    };

    /**
     * لود کردن داده‌های صفحه بعد
     * 
     * @returns
     */
    function nextPage() {
        if (ctrl.loading) {
            return;
        }
        if (requests && !requests.hasMore()) {
            return;
        }
        if (requests) {
            paginatorParameter.setPage(requests.next());
        }
        ctrl.loading = true;
        $sdp.getCategories(paginatorParameter)//
        .then(function(items) {
            requests = items;
            ctrl.items = ctrl.items.concat(requests.items);
        }, function() {
            alert('Fail to load categories');
        })//
        .finally(function(){
            ctrl.loading = false;
        });
    }

    function addCategory(){
        $navigator.openPage('/sdp/categories/new');
    }


    /**
     * تمام حالت‌های کنترلر را دوباره مقدار دهی می‌کند.
     * 
     * @returns
     */
    function reload(){
        requests = null;
        ctrl.items = [];
        paginatorParameter.setPage(1);
        nextPage();
    }

    /**
     * دسته مورد نظر را از سیستم حذف می‌کند.
     * 
     * @param SdpCategory
     * @returns
     */
    function remove(object) {
        return object.delete()//
        .then(function(){
            var index = ctrl.items.indexOf(object);
            if (index > -1) {
                ctrl.items.splice(index, 1);
            }
        });
    }

    /**
     * جستجوی دسته‌ها
     * 
     * @param paginatorParameter
     * @returns
     */
    function find(query) {
        paginatorParameter.setQuery(query);
        paginatorParameter.setPage(1);
        reload();
    }
    
    $scope.reload = reload;
    $scope.search = find;
    $scope.nextPage = nextPage;

    $scope.remove = remove;
    $scope.add = addCategory;

    $scope.ctrl = ctrl;
    $scope.paginatorParameter = paginatorParameter;
    $scope.sortKeys = [ 'id', 'name' ];
    $scope.moreActions = [ {
        title : 'New category',
        icon : 'add',
        action : addCategory
    } ];
    
});
