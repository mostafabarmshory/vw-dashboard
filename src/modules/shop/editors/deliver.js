
/**
 * @ngdoc Controller
 * @name AmdShopDeliveryCtrl
 * @description Controller of a Delivery
 */
mblowfish.addEditor('/shop/delivers/:itemId', {
	templateUrl: 'scripts/module-shop/editors/deliver.html',
	controllerAs: 'ctrl',
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: function(
    /* angularjs  */ $controller, $element,
    /* ngRoute    */ $scope, $state, $editor,
    /* seen-shp   */ $shop, $mbUtil) {
		'ngInject';
		var itemId = $state.params.itemId;
		var isEqualId = $mbUtil.isEqualId;

		angular.extend(this, $controller('MbSeenAbstractItemCtrl', {
			$scope: $scope,
			$element: $element
		}));

		// delete model
		this.deleteModel = function(item) {
			return $shop.deleteDeliver(item.id);
		};

		// get model schema
		this.getModelSchema = function() {
			return $shop.deliverSchema();
		};

		// get model
		this.getModel = function(id) {
			return $shop.getDeliver(id);
		};

		// update model
		this.updateModel = function(item) {
			return item.update();
		};

		//--------------------------------------------------------------------
		// Load
		//--------------------------------------------------------------------

		this.addEventHandler(AMD_SHOP_DELIVER_SP, function(event) {
			_.forEach(event.values, function(value) {
				if (isEqualId(value.id, itemId)) {
					switch (event.key) {
						case 'create':
						case 'update':
							break;
						case 'delete':
							$editor.close();
							break;
					}
				}
			});
		});


		this
			.init({
				eventType: AMD_SHOP_DELIVER_SP,
				modelId: itemId
			})
			.then(function() {
				$editor.setTitle('Deliver:' + itemId);
			});
	}
});

