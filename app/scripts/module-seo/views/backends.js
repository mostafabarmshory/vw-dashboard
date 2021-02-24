mblowfish.view('/seo/backends', {
	title: 'Prerender backends',
	templateUrl: 'scripts/module-seo/views/backends.html',
	groups: ['seo'],
	icon: 'dvr',
	controllerAs: 'ctrl',
	controller: function($scope, $view, $seo, $controller) {
		'ngInject';
		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Overried the function
		this.getModelSchema = function() {
			return $seo.backendSchema();
		};

		// get groups
		this.getModels = function(parameterQuery) {
			return $seo.getBackends(parameterQuery);
		};

		// get a group
		this.getModel = function(id) {
			return $seo.getBackend(id);
		};

		// Add group
		this.addModel = function(model) {
			return $seo.putBackend(model);
		};

		this.init({
			eventType: '/seo/backends'
		});

	},
});
//		/**
//		 * To add a new backend
//		 * 
//		 * @returns
//		 */
//		this.addBackend = function() {
//			$navigator.openPage('seo/backends/new');
//		};
//
//		var ctrl = this;
//		this.addActions([{
//			title: 'New backend',
//			icon: 'add',
//			action: function() {
//				ctrl.addBackend();
//			}
//		}]);