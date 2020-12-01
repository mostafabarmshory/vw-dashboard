
mblowfish.resource('sdp-driver-list', {
	label: 'Driver list',
	templateUrl: 'scripts/module-sdp/resources/drivers.html',
	tags: ['sdp-driver', 'driver_id'],
	controllerAs: 'ctrl',
	controller: function($scope, $options, $resource, $sdp, $controller) {
		'ngInject';
		var ctrl = this;
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.driveSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getDrives(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getDrive(id);
		};

		this.init({
			eventType: SDP_DRIVES_SP,
		});

		this.toggleResourceSelection = function(driver) {
			this.setResourceSelected(driver, !driver.$selected);
		};

		this.setResourceSelected = function(drive, selection) {
			if (!$options.multi) {
				this.clearSelection();
			}
			this.setSelected(drive, selection);
			if ($options.object) {
				$resource.setValue(ctrl.getSelection());
			} else {
				var ids = [];
				_.forEach(ctrl.getSelection(), function(model) {
					ids.push(model.id);
				})
				$resource.setValue(ids);
			}
		};
	},
});