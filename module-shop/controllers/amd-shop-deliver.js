'use strict';

angular.module('ngMaterialDashboardShop')

/**
 * @ngdoc Controller
 * @name AmdShopDeliveryCtrl
 * @description Controller of a Delivery
 */
.controller('AmdShopDeliverCtrl', function ($scope, $shop, $routeParams, $translate, $location, $navigator, $q, QueryParameter) {

    var ctrl = {
            loading: false,
            updating: false,
            edit: false
    };

    /**
     * @name loadDelivery
     * @memberOf AmdShopDeliveryCtrl
     * @description Load the selected deliver
     */
    function loadDeliver() {
        if (ctrl.loading) {
            return;
        }
        ctrl.loading = true;
        $shop.getDeliver($routeParams.deliverId)//
        .then(function (p) {
            $scope.deliver = p;
        }, function () {
            alert($translate.instant('Faild to load the deliver.'));
        })//
        .finally(function () {
            ctrl.loading = false;
        });
    }

    /**
     * @name remove
     * @memberOf AmdShopDeliveryCtrl
     * @description remove the selected deliver from the server
     */
    function remove() {
        confirm($translate.instant('Item will be deleted. There is no undo action.'))//
        .then(function () {
            return $scope.deliver.delete()//
            .then(function () {
                $location.path('/delivers/');
            }, function () {
                alert('Fail to delete the deliver.');
            });
        });
    }

    /**
     * @name save
     * @memberOf AmdShopDeliveryCtrl
     * @description Update the selected deliver
     */
    function save() {
        if (ctrl.updating) {
            return;
        }
        ctrl.updating = true;
        $scope.deliver.update()//
        .then(function (newDeliver) {
            $scope.deliver = newDeliver;
            ctrl.edit = false;
        }, function () {
            alert($translate.instant('Failed to update deliver.'));
        })//
        .finally(function () {
            ctrl.updating = false;
        });
    }

    /*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
     */
    $scope.remove = remove;
    $scope.save = save;
    $scope.ctrl = ctrl;

    loadDeliver();
});

