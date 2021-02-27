mblowfish.addView('/bank/gates-new', {
	title: 'New bank gate',
	icon: 'add',
	templateUrl: 'scripts/module-bank/views/gates-new.html',
	groups: ['Finance'],
	controllerAs: 'ctrl',
	controller: function($scope, $bank, $mbActions) {
		'ngInject';
		/**
		 * Load banks
		 * 
		 * @returns
		 */
		function loadBanks() {
			return $bank.getEngines()//
				.then(function(banks) {
					$scope.banks = banks;
				});
		}

		function loadBankProperties(bank) {
			return $bank.getEngine(bank.type)//
				.then(function(property) {
					$scope.properties = property;
				});
		}

		function newGate(bank, data) {
			$scope.creatingNewGate = true;
			data.type = bank.type;
			return $mbActions.exec(AMD_BANK_GATES_CREATE_ACTION, {
				values: [data]
			}).finally(function() {
				$scope.creatingNewGate = false;
				// TODO: cleare view
			});
		}

		/*
		 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
		 */
		$scope.items = [];

		$scope.loadBanks = loadBanks;
		$scope._userValus = {};
		$scope.newGate = newGate;
		$scope.loadBankProperties = loadBankProperties;

		_.assign(this, {
			// variables
			working: false,

			// functions
			createGate: newGate
		});
	},
});