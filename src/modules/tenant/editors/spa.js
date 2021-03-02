
import templateUrl from './spa.html';

export default {
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	/**
	SPA Editor Controller
	
	@ngInject
	 */
	controller: function($scope, $tenant, $state, $controller, $editor) {

		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenAbstractItemEditorCtrl', {
			$scope: $scope,
			$editor: $editor
		}));

		/**
		 Reload data
	
		This is called if the model is required to reload.
		 */
		this.reload = function() {
			var ctrl = this;
			var job = $tenant.getSpa($state.params.spaId)//
				.then(function(model) {
					ctrl
						.setStorePath(TENANT_SPAS_SP)
						.setModel(model);
					return model.getPossibleTransitions();
				})//
				.then(function(transList) {
					ctrl
						.setTransitions(transList.items);
				});
			// Editor knows which is the current job
			return this.setJob(job);
		};

		this.reload();
	},
}
