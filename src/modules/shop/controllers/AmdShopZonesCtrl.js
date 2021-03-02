
/**

@ngInject
 */
export default function(
        /* angularjs */ $scope, $controller,
        /* seen-shop */ $shop) {

	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope,
	}));

	// Override the function
	this.getModelSchema = function() {
		return $shop.zoneSchema();
	};

	// get accounts
	this.getModels = function(parameterQuery) {
		return $shop.getZones(parameterQuery);
	};

	// get an account
	this.getModel = function(id) {
		return $shop.getZone(id);
	};

	// delete account
	this.deleteModel = function(model) {
		return $shop.deleteZone(model.id);
	};

	this.init({
		eventType: AMD_SHOP_ZONE_SP,
	});
}


