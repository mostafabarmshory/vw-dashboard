mblowfish.addEditor('/spas/:spaId', {
	templateUrl: 'scripts/module-spa/editors/spa.html',
	controllerAs: 'ctrl',
	controller: function($scope, $tenant, $state, $controller, $editor) {
		'ngInject';

		// Extends with ItemsController
		angular.extend(this, $controller('SeenAbstractItemEditorCtrl', {
			$scope: $scope,
			$editor: $editor
		}));

		/*
		A custom delete item process
		*/
		//		this.updateItem = function(){
		//			return this.model.update();
		//		}
		
		/*
		A custom update item process
		*/
		//		this.deleteItem = function(){
		//			return this.model.delete();
		//		}

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
});
