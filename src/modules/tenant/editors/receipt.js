
mblowfish.addEditor('/receipts/:id', {
	templateUrl: 'views/amd-tenant-receipt.html',
	controller: function($scope, $state, $tenant/*, $app, $window*/) {
		'ngInject';

		var ctrl = {
			laoding: false,
			receipt: null,
			gate: null
		};
		$scope.ctrl = ctrl;

		/**
		 * Sets a receipt in the scope
		 *
		 * @param receipt
		 * @returns
		 */
		function setReceipt(receipt) {
			ctrl.receipt = receipt;
			// TODO: set page title
		}

		/**
		 * Get the receipt id
		 * @returns
		 */
		function getReceiptId() {
			return ($state.params.id || null);
		}

		/**
		 * Loads receipt data
		 * @returns
		 */
		function loadReceipt() {
			if (ctrl.loading === true) {
				return;
			}
			ctrl.loading = true;
			$tenant.getReceipt(getReceiptId())//
				.then(function(receipt) {
					setReceipt(receipt);
					return $tenant.getGate(receipt.backend);
				}, function(error) {
					ctrl.error = error;
				})//
				.then(function(gate) {
					ctrl.gate = gate;
				})//
				.finally(function() {
					ctrl.loading = false;
				});
		}

		/**
		 * Cancel page
		 * @returns
		 */
		//	function cancel(){
		//		$window.history.back();
		//	}

		$scope.load = loadReceipt;
		//	loadReceipt();
	},
	controllerAs: 'ctrl',
	helpId: 'receipt'
});