mblowfish.addView('/bank/gates', {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Bank gates',
	icon: 'attach_money',
	templateUrl: 'scripts/module-bank/views/gates.html',
	groups: ['Finance'],
	controller: function($scope, $controller, $bank, $mbActions, $view) {
		'ngInject';

		function deleteGate(gate) {
			return $mbActions.exec(AMD_BANK_GATES_DELETE_ACTION, {
				values: [gate]
			});
		}

		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
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
		this.deleteModel = deleteGate;
		this.deleteGate = deleteGate;

		this.editGate = function(gate) {
			return $mbActions.exec(AMD_BANK_GATES_EDIT_ACTION, {
				values: [gate],
			});
		};

		this.init({
			eventType: AMD_BANK_GATE_SP
		});
	},
});