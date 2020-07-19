mblowfish.addView('/bank/gates-new', {
	title: 'New bank gate',
	icon: 'add',
	controller: function($scope, $bank, $navigator, $mbTranslate) {

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
			return $bank.putBackend(data)//
				.then(function() {
					toast($mbTranslate.instant('New bank gate is created successfully'));
					$navigator.openPage('/bank/gates');
				}, function() {
					alert($mbTranslate.instant('Fail to create new bank gate'));
				})//
				.finally(function() {
					$scope.creatingNewGate = false;
				});
		}

		// $scope.$watch('_bank', function(value){
		//	
		// return loadBankProperties(value);
		// });
		/*
		 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
		 */
		$scope.items = [];

		$scope.loadBanks = loadBanks;
		$scope._userValus = {};
		$scope.newGate = newGate;
		$scope.loadBankProperties = loadBankProperties;
	},
	templateUrl: 'scripts/module-bank/views/gates-new.html',
	groups: ['Finance'],
});