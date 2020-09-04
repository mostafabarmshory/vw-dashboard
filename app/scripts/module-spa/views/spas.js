
mblowfish.view(TENANT_SPAS_VIEW, {
	templateUrl: 'scripts/module-spa/views/spas.html',
	title: 'spas',
	icon: 'apps',
	groups: ['Applications'],
	controllerAs: 'ctrl',
	controller: function($scope, $tenant, $view, $controller) {
		'ngInject';

		// Extends with ItemsController
		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view
		}));

		/*
		 * Overried the function
		 */
		this.getModelSchema = function() {
			return $tenant.spaSchema();
		};

		// get spas
		this.getModels = function(parameterQuery) {
			return $tenant.getSpas(parameterQuery);
		};

		// get a spa
		this.getModel = function(id) {
			return $tenant.getSpa(id);
		};

		this.init({
			eventType: '/spas'
		});

//		/**
//		 * add an spa
//		 */
//		this.addSpa = function() {
//			$navigator.openPage('spas/upload');
//		};
//
//		/**
//		 * Add an spa from repository
//		 */
//		this.addSpaFromRepo = function() {
//			$navigator.openPage('spas/repository');
//		};
//		this.sortKeys = ['id', 'creation_dtime'];
//		var ctrl = this;
//		this.addActions([{
//			title: 'Upload spa',
//			icon: 'add',
//			action: function() {
//				ctrl.addSpa();
//			}
//		}, {
//			title: 'Add spa from repository',
//			icon: 'add',
//			action: function() {
//				ctrl.addSpaFromRepo();
//			}
//		}]);
	},
});