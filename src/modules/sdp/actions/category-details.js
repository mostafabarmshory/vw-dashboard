

mblowfish.addAction(SDP_CATEGORIES_DETAILS_ACTION, {
	demon: true,
	action: function($event, $mbDialog,  $rootScope, $rootElement, $mbActions) {
		'ngInject';
		var values = $event.values;
		if (!values || !_.isArray(values) || values.length < 1) {
			return;
		}

		return $mbDialog.show({
			templateUrl: 'scripts/module-sdp/actions/category-details-dialog.html',
			locals: {
				$category: values[0]
			},
			scope: $rootScope.$new(),
			parent: $rootElement,
			targetEvent: $event,
			clickOutsideToClose: true,
			openFrom: $event.target,
			closeTo: $event.target,
			preserveScope: false,
			hasBackdrop: true,
			escapeToClose: true,
			focusOnOpen: true,
			fullscreen: true,
			multiple: true,
			autoWrap: true,
			controllerAs: 'ctrl',
			/*@ngInject*/
			controller: function($scope, $mdDialog, $category) {
				$scope.category = $category;
				$scope.close = function() {
					$mdDialog.hide();
				};
				$scope.exec = function(actionId, $event, close) {
					$event.values = [$category];
					$mbActions.exec(actionId, $event);
					if (close) {
						$mdDialog.hide();
					}
				};
			}
		});
	},
});

