'use strict';

angular.module('ngMaterialDashboardBank')

/**
 * @ngdoc controller
 * @name AmdBankGates
 * @description Manages bank backends
 * 
 */
.controller('AmdBankGatesCtrl', function ($scope, $bank, QueryParameter, $navigator, $translate) {

    var paginatorParameter = new QueryParameter();
    paginatorParameter.setOrder('id', 'd');
    var requests = null;
    var ctrl = {
            status: 'relax',
            items: []
    };

    /**
     * لود کردن داده‌های صفحه بعد
     * 
     * @returns
     */
    function nextPage() {
        if (ctrl.status === 'working') {
            return;
        }
        if (requests && !requests.hasMore()) {
            return;
        }
        if (requests) {
            paginatorParameter.setPage(requests.next());
        }
        // start state (device list)
        ctrl.status = 'working';
        $bank.getBackends(paginatorParameter)//
        .then(function (items) {
            requests = items;
            ctrl.items = ctrl.items.concat(requests.items);
            ctrl.status = 'relax';
        }, function () {
            ctrl.status = 'fail';
        });
    }


    /**
     * درخواست مورد نظر را از سیستم حذف می‌کند.
     * 
     * @param request
     * @returns
     */
    function remove(pobject) {
        confirm($translate.instant('The bank gate will be deleted.'))//
        .then(function () {
            pobject.delete()//
            .then(function () {
                var index = ctrl.items.indexOf(pobject);
                if (index > -1) {
                    ctrl.items.splice(index, 1);
                }
            });
        });
    }

    /**
     * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
     * 
     * @returns
     */
    function reload() {
        requests = null;
        ctrl.items = [];
        nextPage();
    }


    function newGate(bank, data) {
        $scope.creatingNewGate = true;
        data.type = bank.type;
        return $bank.putBackend(data)//
        .then(function () {
            $navigator.openPage('/bank/gates');
        }, function () {
            alert($translate.instant('Fail to create new bank gate'));
        })//
        .finally(function () {
            $scope.creatingNewGate = false;
        });
    }
    /*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
     */

    $scope.nextPage = nextPage;
    $scope.remove = remove;
    $scope.newGate = newGate;
    $scope.reload = reload;
    $scope.ctrl = ctrl;


    // Pagination
    $scope.paginatorParameter = paginatorParameter;
    $scope.sortKeys = [
        'id',
        'creation_dtime'
        ];
    $scope.moreActions = [{
        title: 'New bank gate',
        icon: 'add',
        action: function () {
            $navigator.openPage('/bank/gates/new');
        }
    }];

});
