//
///**
// * @ngdoc function
// * @name saasdmCpanelApp.controller:MainCtrl
// * @description # SdpAssetsCtrl Controller of the saasdmCpanelApp
// */
//mblowfish.controller('SdpAssetsCtrl', function($scope, $sdp, $navigator, QueryParameter) {
//
//    var paginatorParameter = new QueryParameter();
//    paginatorParameter.setOrder('id', 'd');
//    var requests = null;
//    var ctrl = {
//        loadingItems: false,
//        items: []
//    };
//
//    /**
//     * جستجوی درخواست‌ها
//     * 
//     * @param paginatorParameter
//     * @returns
//     */
//    function find(query) {
//        paginatorParameter.setQuery(query);
//        paginatorParameter.setPage(1);
//        reload();
//    }
//
//    /**
//     * لود کردن داده‌های صفحه بعد
//     * 
//     * @returns
//     */
//    function nextPage() {
//        if (ctrl.loadingItems) {
//            return;
//        }
//        if (requests && !requests.hasMore()) {
//            return;
//        }
//        if (requests) {
//            paginatorParameter.setPage(requests.next());
//        }
//        ctrl.loadingItems = true;
//        $sdp.getAssets(paginatorParameter)//
//        .then(function(items) {
//            requests = items;
//            ctrl.items = ctrl.items.concat(requests.items);
//            ctrl.loadingItems = false;
//        }, function() {
//            ctrl.loadingItems = false;
//        });
//    }
//
//    function addAsset(){
//        $navigator.openPage('/sdp/assets/new');
//    }
//
//    /**
//     * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
//     * 
//     * @returns
//     */
//    function reload(){
//        requests = null;
//        ctrl.items = [];
//        paginatorParameter.setPage(1);
//        nextPage();
//    }
//
//    /**
//     * درخواست مورد نظر را از سیستم حذف می‌کند.
//     * 
//     * @param request
//     * @returns
//     */
//    function remove(object) {
//        return object.delete()//
//        .then(function(){
//            var index = ctrl.items.indexOf(object);
//            if (index > -1) {
//                ctrl.items.splice(index, 1);
//            }
//        });
//    }
//
//    $scope.reload = reload;
//    $scope.search = find;
//    $scope.nextPage = nextPage;
//
//    $scope.remove = remove;
//    $scope.add = addAsset;
//
//    $scope.ctrl = ctrl;
//    $scope.paginatorParameter = paginatorParameter;
//    $scope.sortKeys = [ 'id', 'name' ];
//    $scope.moreActions = [ {
//        title : 'New asset',
//        icon : 'add',
//        action : addAsset
//    } ];
//});
