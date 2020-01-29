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

angular.module('ngMaterialDashboardTenant').config(function ($routeProvider) {
    $routeProvider
        .when('/tenant/tenants', {
            templateUrl: 'views/amd-tenant-tenants.html',
            controller: 'AmdTenantTenantsController',
            controllerAs: 'ctrl',
            groups: ['tenant'],
            navigate: true,
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.account.permissions.tenant_owner;
            },
            loginRequired: true,
            name: 'Tenants',
            icon: 'business'
        })
        .when('/tenant/tenants/:tenantId', {
            templateUrl: 'views/amd-tenant-tenant.html',
            controller: 'AmdTenantTenantController',
            controllerAs: 'ctrl'
        })
        .when('/tenant/tickets', {
            templateUrl: 'views/amd-tenant/ticket-list.html',
            controller: 'AmdTenantTicketsController',
            groups: ['tenant'],
            navigate: true,
            name: 'Tickets',
            icon: 'question_answer',
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.app.user.tenant_owner;
            },
            /*
             * @ngInject
             */
            integerate: function ($actions) {
                $actions.group('navigationPathMenu').clear();
                $actions.newAction({
                    id: 'tenant',
                    title: 'Tenant Info',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tenants/current',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-tickets',
                    title: 'Tickets',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tickets',
                    groups: ['navigationPathMenu']
                });
            }
        }) //
        .when('/tenant/tickets/:ticketId', {
            templateUrl: 'views/amd-tenant/ticket.html',
            controller: 'AmdTenantTicketController',
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.app.user.tenant_owner;
            },
            /*
             * @ngInject
             */
            integerate: function ($actions, $routeParams) {
                $actions.group('navigationPathMenu').clear();
                $actions.newAction({
                    id: 'tenant',
                    title: 'Tenant Info',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tenants/current',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-tickets',
                    title: 'Tickets',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tickets',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-ticket-' + $routeParams.ticketId,
                    title: 'Ticket #' + $routeParams.ticketId,
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tickets/' + $routeParams.ticketId,
                    groups: ['navigationPathMenu']
                });
            }
        })
        .when('/tenant/invoices', {
            templateUrl: 'views/amd-tenant/invoice-list.html',
            controller: 'AmdTenantInvoicesController',
            groups: ['tenant'],
            navigate: true,
            name: 'Invoices',
            icon: 'attach_money',
            helpId: 'invoice',
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.__account.permissions.tenant_owner;
            },
            /*
             * @ngInject
             */
            integerate: function ($actions) {
                $actions.group('navigationPathMenu').clear();
                $actions.newAction({
                    id: 'tenant',
                    title: 'Tenant Info',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tenants/current',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-invoices',
                    title: 'Invoices',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/invoices',
                    groups: ['navigationPathMenu']
                });
            }
        }) //
        .when('/tenant/invoices/new', {
            templateUrl: 'views/amd-tenant/invoice-new.html',
            controller: 'AmdTenantInvoiceController',
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.__account.permissions.tenant_owner;
            },
            /*
             * @ngInject
             */
            integerate: function ($actions) {
                $actions.group('navigationPathMenu').clear();
                $actions.newAction({
                    id: 'tenant',
                    title: 'Tenant Info',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tenants/current',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-invoices',
                    title: 'Invoices',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/invoices',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'new-invoice',
                    title: 'New invoice',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/invoices/new',
                    groups: ['navigationPathMenu']
                });
            }
        }) //
        .when('/tenant/invoices/:invoiceId', {
            templateUrl: 'views/amd-tenant/invoice.html',
            controller: 'AmdTenantInvoiceController',
            helpId: 'invoiceDetails',
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.__account.permissions.tenant_owner;
            },
            /*
             * @ngInject
             */
            integerate: function ($actions, $routeParams) {
                $actions.group('navigationPathMenu').clear();
                $actions.newAction({
                    id: 'tenant',
                    title: 'Tenant Info',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tenants/current',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-invoices',
                    title: 'Invoices',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/invoices',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-invoice-' + $routeParams.invoiceId,
                    title: 'Ticket #' + $routeParams.invoiceId,
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/invoices/' + $routeParams.invoiceId,
                    groups: ['navigationPathMenu']
                });
            }
        }) //
        .when('/receipts/:id', {
            templateUrl: 'views/amd-tenant-receipt.html',
            controller: 'AmdTenantReceiptCtrl',
            protect: true,
            helpId: 'receipt'
        })

        .when('/tenant/settings/security', {
            templateUrl: 'views/amd-setting-security.html',
            controller: 'AmdSettingsSecurityCtrl',
            navigate: true,
            groups: ['tenant'],
            name: 'Security',
            icon: 'font_download',
            helpId: 'setting-captcha',
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.__account.permissions.tenant_owner;
            },
            /*
             * @ngInject
             */
            integerate: function ($actions) {
                $actions.group('navigationPathMenu').clear();
                $actions.newAction({
                    id: 'tenant',
                    title: 'Tenant Info',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tenants/current',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-settings',
                    title: 'Tenant Settings',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/settings',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-security',
                    title: 'Security',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/settings/security',
                    groups: ['navigationPathMenu']
                });
            }
        }).when('/tenant/settings/local-setting', {
            templateUrl: 'views/amd-local-setting.html',
            controller: 'AmdLocalSettingsCtrl',
            navigate: true,
            groups: ['tenant'],
            name: 'Local settings',
            icon: 'settings_applications',
            helpId: '',
            /*
             * @ngInject
             */
            protect: function ($rootScope) {
                return !$rootScope.__account.permissions.tenant_owner;
            },
            /*
             * @ngInject
             */
            integerate: function ($actions) {
                $actions.group('navigationPathMenu').clear();
                $actions.newAction({
                    id: 'tenant',
                    title: 'Tenant Info',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/tenants/current',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'tenant-settings',
                    title: 'Tenant Settings',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/settings',
                    groups: ['navigationPathMenu']
                });
                $actions.newAction({
                    id: 'local-settings',
                    title: 'Local settings',
                    type: 'link',
                    priority: 10,
                    visible: true,
                    url: 'tenant/settings/local-settings',
                    groups: ['navigationPathMenu']
                });
            }
        });
});
