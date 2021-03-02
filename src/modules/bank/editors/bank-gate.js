
/**
 * @ngdoc controller
 * @name AmdBankGates
 * @description Manages bank backends
 * 
 */
mblowfish.addEditor('/bank/gates/:gateId', {
	templateUrl: 'scripts/module-bank/editors/bank-gate.html',
	controller: function($scope, $bank, $state, $mbActions, $editor) {
		var ctrl = this;

		/**
		 * درخواست مورد نظر را از سیستم حذف می‌کند.
		 * 
		 * @param request
		 * @returns
		 */
		function deleteGate($event) {
			$event = $event || {};
			$event.values = [$scope.gate];
			ctrl.state = 'working';
			return $mbActions.exec(AMD_BANK_GATES_DELETE_ACTION, $event)
				.then(function() {
					//close the editor
					$editor.close();
				})
				.finally(function() {
					ctrl.state = 'relax';
				});
		}

		function updateGate($event) {
			$event = $event || {};
			$event.values = [$scope.gate];
			ctrl.state = 'working';
			return $mbActions.exec(AMD_BANK_GATES_UPDATE_ACTION, $event)
				.finally(function() {
					ctrl.state = 'relax';
				});
		}

		function load() {
			if (ctrl.state !== 'relax') {
				return;
			}
			ctrl.state = 'working';
			return $bank.getBackend($state.params.gateId)//
				.then(function(gate) {
					$scope.gate = gate;
					return $scope.gate;
				})
				.finally(function() {
					ctrl.state = 'relax';
				});
		}

		_.assign(this, {
			state: 'relax',
			edit: false,

			deleteGate: deleteGate,
			updateGate: updateGate,
		});

		load();

	},
	controllerAs: 'ctrl',
});


