mblowfish.addView('/bank/gates', {
	title: 'Bank gates',
	icon: 'attach_money',
	controller: function($scope, $controller, $bank, $mbActions) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $bank.backendSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $bank.getBackends(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $bank.getBackend(id);
		};

		// delete account
		this.deleteModel = function(content) {
			return $bank.deleteBackend(content.id);
		};

		this.deleteGate = function(gate) {
			return $mbActions.exec(AMD_BANK_GATES_DELETE_ACTION, {
				values: [gate]
			});
		};
		
		this.editGate = function(gate) {
			return $mbActions.exec(AMD_BANK_GATES_EDIT_ACTION, {
				values: [gate],
			});
		};

		this.init({
			eventType: AMD_BANK_GATE_SP
		});
	},
	controllerAs: 'ctrl',
	templateUrl: 'views/bank/views/gates.html',
	groups: ['Finance'],
});