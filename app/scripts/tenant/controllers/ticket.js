/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

angular.module('ngMaterialDashboardTenant')

/**
 * 
 * ctrl is placed in scpoe
 * 
 * 
 */
.controller('AmdTenantTicketController', function ($scope, $routeParams, $tenant, QueryParameter) {

    var paginatorParameter = new QueryParameter();
    paginatorParameter.setOrder('creation_dtime', 'd');
    var requests = null;

    /**
     * Controller status
     */
    var ctrl = {
            /**
             * Status of the controller
             * 
             * <ul>
             * <li>relax: all things is ok</li>
             * <li>loading: getting data from server</li>
             * <li>error: faced with error, the error will be placed in ctrl.error</li>
             * </ul>
             */
            status: 'relax',
            /**
             * Comments status
             * 
             * <ul>
             * <li>relax: all things is ok</li>
             * <li>loading: getting data from server</li>
             * <li>error: faced with error, the error will be placed in ctrl.commentsError</li>
             * </ul>
             */
            commentsStatus: 'loading',
            /**
             * List of all comments
             */
            comments: []
    }
    $scope.ctrl = ctrl;

    /**
     * Load ticket
     */
    function loadTicket() {
        if (ctrl.status == 'loading') {
            return;
        }
        $scope.ticket = null;
        requests = null;
        ctrl.items = [];
        ctrl.status = 'loading';
        return $tenant.getTicket($routeParams.ticketId)//
        .then(function (ticket) {
            $scope.ticket = ticket;
            ctrl.status = 'relax';
            ctrl.commentsStatus = 'relax';
            nextPage();
        }, function (error) {
            ctrl.status = 'error';
            ctrl.error = error;
        });
    }

    /**
     * لود کردن داده‌های صفحه بعد
     * 
     * @returns
     */
    function nextPage() {
        if (ctrl.commentsStatus === 'loading') {
            return;
        }
        if (requests && !requests.hasMore()) {
            return;
        }
        if (requests) {
            paginatorParameter.setPage(requests.next());
        }
        // start state (device list)
        ctrl.commentsStatus = 'loading';
        return $scope.ticket.getComments(paginatorParameter)//
        .then(function (items) {
            requests = items;
            ctrl.comments = ctrl.items.concat(requests.items);
            ctrl.commentsStatus = 'relax';
            ctrl.commentsError = null;
        }, function (error) {
            ctrl.commentsError = error;
            ctrl.commentsStatus = 'error';
        });
    }

    /**
     * To add new comment
     */
    function addComment(comment) {
        return $scope.ticket.putComment(comment)//
        .then(function (nc) {
            ctrl.comments.unshift(nc);
        });
    }

    function toggleEdit() {
        $scope.editing = !$scope.editing;
    }

    /**
     * To save the subject
     */
    function updateSubject() {
        $scope.ticket.update()
        .then(function (ticket) {
            $scope.editing = false;
            $scope.ticket.subject = ticket.subject;
        });
    }

    loadTicket();
    $scope.addComment = addComment;
    $scope.toggleEdit = toggleEdit;
    $scope.updateSubject = updateSubject;
    $scope.editing = false;
});
