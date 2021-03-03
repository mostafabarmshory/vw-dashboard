import templateUrl from './tenant.html';

export default {
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($scope, $state, $editor, $q, $tenant, $controller, $mbTranslate, $mbResource, TenantTenant, TenantAccount) {
		'ngInject';

		/*
		 * Extends collection controller from MbAbstractCtrl 
		 */
		angular.extend(this, $controller('MbSeenAbstractItemEditorCtrl', {
			$scope: $scope,
			$editor: $editor
		}));


		/**
		 * Load tenant
		 */
		this.load = function() {
			var ctrl = this;
			var tenantId = $state.params.tenantId;
			ctrl.setStorePath(TENANT_TENANTS_SP)
				.setTitle('Tenant:' + tenantId);
			return $tenant
				.getTenant(tenantId, {
					graphql: '{id,title, description,subdomain,domain,validate,parent_id,modif_dtime,creation_dtime,owners{id,login,date_joined}}'
				})//
				.then(function(tenant) {
					// TODO: maso, 2020: load owners
					ctrl.loadOwners(tenant.owners);
					delete tenant.owners;
					ctrl.setModel(new TenantTenant(tenant));
					ctrl.setDerty(false);
				}, function(/*error*/) {
					alert($mbTranslate.instant('Failed to load tenant.'));
				});
		};

		this.addOwners = function($event) {
			if (this.ownersPromise) {
				return this.ownersPromise;
			}
			var ctrl = this;
			$mbResource
				.get(AMD_USER_ACCOUNTS_RT, {
					targetEvent: $event
				})
				.then(function(accounts) {
					var jobs = [];
					_.forEach(accounts, function(account) {
						jobs.push(ctrl.tenant.putOwner(account)
							.then(function() {
								ctrl.owners.push(account);
							}));
					});
					ctrl.ownersPromise = $q.all(jobs);
					return ctrl.ownersPromise;
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
	}
}



