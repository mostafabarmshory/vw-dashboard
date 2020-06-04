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


mblowfish.controller('AmdTenantTenantController', function(
		/* angularjs   */ $scope, $state, $q,
		/* ngtranslate */ $tenant, $navigator, $translate,
		/* am-wb-core  */ $mbResource,
		/* seen-tenant */ TenantTenant, TenantAccount) {


	/**
	 * Load tenant
	 */
	this.load = function() {
		if (this.loading) {
			return;
		}
		var tenantId = $state.params.tenantId;
		this.loading = true;
		var ctrl = this;
		return $tenant.getTenant(tenantId, {
			graphql: '{id,title, description,subdomain,domain,validate,modif_dtime,creation_dtime,owners{id,login,date_joined}}'
		})//
			.then(function(tenant) {
				// TODO: maso, 2020: load owners
				ctrl.loadOwners(tenant.owners);
				delete tenant.owners;
				ctrl.tenant = new TenantTenant(tenant);
			}, function(error) {
				alert($translate.instant('Failed to load tenant.'));
			})//
			.finally(function() {
				ctrl.loading = false;
			});
	};

	/**
	 * Update current tenant
	 */
	this.update = function() {
		if (this.saving) {
			return;
		}
		this.saving = true;
		var ctrl = this;
		this.checkTenant();
		return this.tenant.update()//
			.then(function(tenant) {
				ctrl.tenant = tenant;
				ctrl.edit = false;
			}, function() {
				// show error
				alert($translate.instant('Failed to save tenant'));
			})
			.finally(function() {
				ctrl.saving = false;
			});
	};

	this.checkTenant = function() {
		if (this.tenant.title.length === 0) {
			delete this.tenant.title;
		}
		if (this.tenant.subdomain.length === 0) {
			delete this.tenant.subdomain;
		}
		if (this.tenant.domain.length === 0) {
			delete this.tenant.domain;
		}
	};

	/**
	 * Remoe current tenant
	 */
	this.remove = function() {
		if (this.removing) {
			return;
		}
		var ctrl = this;
		confirm($translate.instant('delete tenant?'))//
			.then(function() {
				ctrl.removing = true;
				return ctrl.tenant.delete();
			}, function() {
				// cancel action. do nothing.
			})
			.then(function() {
				$navigator.openPage('tenant/tenants');
			}, function() {
				// show error
				alert($translate.instant('Failed to delete tenant'));
			})
			.finally(function() {
				ctrl.removing = false;
			});
	};

	this.addOwners = function() {
		if (this.ownersPromise) {
			return this.ownersPromise;
		}
		var ctrl = this;
		$mbResource
			.get('/user/accounts')
			.then(function(accounts) {
				var jobs = [];
				_.forEach(accounts, function(account) {
					jobs.push(ctrl.tenant.putOwner(account)
						.then(function() {
							ctrl.owners.push(account);
						}));
				});
				return ctrl.ownersPromise = $q.all(jobs);
			})
			.finally(function() {
				delete ctrl.ownersPromise;
			});
	};

	this.deleteOwner = function(owner) {
		if (this.ownersPromise) {
			return this.ownersPromise;
		}
		var ctrl = this;
		this.tenant.deleteOwner(owner)
			.then(function() {
				_.remove(ctrl.owners, function(item) {
					return item.id === owner.id;
				});
			})
			.finally(function() {
				delete ctrl.ownersPromise;
			});
	};

	this.loadOwners = function(ownersData) {
		var owners = [];
		_.forEach(ownersData, function(ownerData) {
			owners.push(new TenantAccount(ownerData));
		});
		this.owners = owners;
	};

	this.load();
});
