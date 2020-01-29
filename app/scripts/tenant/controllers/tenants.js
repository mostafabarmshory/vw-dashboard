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
angular.module('ngMaterialDashboardTenant')

	/**
	 * @ngdoc Controller
	 * @name AmdTenantTenantsController
	 * @description Manages list of tenants from the current tenant.
	 * 
	 * Each tenant can create multi sub tenants. This is a controller of the subtenatns.
	 */
	.controller('AmdTenantTenantsController', function (
		/* angularjs      */ $scope, $controller,
		/* seen-tenant    */ $tenant,
		/* ng-translate   */ $translate,
		/* mblowfish-core */ $navigator) {

		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

	    /**
	     * Gets schema of the tenant model
	     */
		this.getModelSchema = function () {
			return $tenant.tenantSchema();
		};

		// get tenants
		this.getModels = function (parameterQuery) {
			return $tenant.getTenants(parameterQuery);
		};

		// get a tenant
		this.getModel = function (id) {
			return $tenant.getTenant(id);
		};

		// delete tenant
		this.deleteModel = function (item) {
			return item.delete();
		};

		this.add = function () {
			return $navigator.openDialog({
				templateUrl: 'views/dialogs/tenant-new.html',
				config: {}
			}).then(function (newConfig) {
				ctrl.createTenant(newConfig);
			});
		};

	    /*
	     * Create tenant 
	     */
		this.createTenant = function (tenant) {
			if (ctrl.tenantSaving) {
				return;
			}
			ctrl.tenantSaving = true;
			$tenant.putTenant(tenant)
				.then(function (tenant) {
					ctrl.items = ctrl.items.concat(tenant);
				}, function () {
					alert($translate.instant('Fail to create new tenant.'));
				})//
				.finally(function () {
					ctrl.tenantSaving = false;
				});
		};


		// initial the controller
		this.init({
			eventType: '/tenant/tenants'
		});

		// add actions
		var ctrl = this;
		this.addActions([{
			title: 'New tenant',
			icon: 'add',
			action: function () {
				ctrl.add();
			}
		}]);
	});