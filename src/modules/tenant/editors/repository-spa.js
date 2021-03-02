mblowfish.editor('/spas/repository/:spaId', {
	templateUrl: 'scripts/module-spa/editors/repository-spa.html',
	contorllerAs: 'ctrl',
	controller: function($scope, $state, $tenant, $mbActions) {
		'ngInject';
		/**
		 * Load the spa
		 */
		function load() {
			$scope.working = $tenant.getRepositorySpa($state.params.spaId)//
				.then(function(spa) {
					$scope.spa = spa;
					return $scope.spa.getPossibleTransitions();
				})//
				.then(function(states) {
					$scope.states = states.items;
				})//
				.finally(function() {
					$scope.working = false;
				});
			return $scope.working;
		}

		/**
		 * Go to the new state.
		 */
		function putTransition(transition, $event) {
			if ($scope.working) {
				return;
			}
			$event.values = [$scope.spa];
			$event.transition = transition;
			return $mbActions.exec(SEEN_MODEL_TRANSITIONS_CREATE, $event)
				.finally(function() {
					$scope.working = false;
				});
		}

		/*
		 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری
		 * شده است.
		 */
		$scope.gotoState = putTransition;

		load();
	},
});