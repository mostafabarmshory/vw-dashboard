

mblowfish.addAction(SDP_ASSETS_DETAILS_ACTION, {
	demon: true,
	action: function($event, $mbDialog,  $rootScope, $rootElement, $mbActions) {
		'ngInject';
		var values = $event.values;
		if (!values || !_.isArray(values) || values.length < 1) {
			return;
		}

		return $mbDialog.show({
			templateUrl: 'scripts/module-sdp/actions/assets-details-dialog.html',
			locals: {
				$asset: values[0]
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
			controller: function($scope, $mdDialog, $asset) {
				$scope.asset = $asset;
				$scope.close = function() {
					$mdDialog.hide();
				};
				$scope.exec = function(actionId, $event, close) {
					$event.values = [$asset];
					$mbActions.exec(actionId, $event);
					if (close) {
						$mdDialog.hide();
					}
				};
			}
		});
	},
});

