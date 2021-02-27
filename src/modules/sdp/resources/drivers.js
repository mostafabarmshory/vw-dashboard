
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

		//-------------------------------------------------------
		// Common in all resources
		//-------------------------------------------------------
		this.toggleResourceSelection = function(item) {
			this.setResourceSelected(item, !item.$selected);
		};

		this.setResourceSelected = function(item, selection) {
			if (!$options.multi) {
				this.clearSelection();
			}
			this.setSelected(item, selection);
			if ($options.object) {
				$resource.setValue(ctrl.getSelection());
			} else {
				var ids = [];
				_.forEach(ctrl.getSelection(), function(model) {
					ids.push(model.id);
				});
				$resource.setValue(ids);
			}
		};
	},
});