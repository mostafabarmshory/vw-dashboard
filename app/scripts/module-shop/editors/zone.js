/**
@ngdoc Editor
@name AmdShopZoneCtrl
@description Manages a zone from shop domain
 */
mblowfish.addEditor('/shop/zones/:itemId', {
	templateUrl: 'scripts/module-shop/editors/zone.html',
	controllerAs: 'ctrl',
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: function(
    /* angularjs  */ $scope, $controller, $element, $mbUtil,
    /* ngRoute    */ $state, $editor,
    /* seen-shp   */ $shop) {
		'ngInject';
		var itemId = $state.params.itemId;
		var isEqualId = $mbUtil.isEqualId;


		angular.extend(this, $controller('MbSeenAbstractItemCtrl', {
			$scope: $scope,
			$element: $element
		}));

		/**
		 * Deletes model
		 * 
		 * @param item
		 * @return promiss to delete item
		 * @memberof AmdShopZoneCtrl
		 * @see MbSeenAbstractItemCtrl
		 */
		this.deleteModel = function(item) {
			return $shop.deleteZone(item.id);
		};

		/**
		 * Gets item schema
		 * 
		 * @return promise to get schema
		 * @memberof AmdShopZoneCtrl
		 * @see MbSeenAbstractItemCtrl
		 */
		this.getModelSchema = function() {
			return $shop.zoneSchema();
		};

		/**
		 * Query and get items
		 * 
		 * @param queryParameter to apply search
		 * @return promiss to get items
		 * @memberof AmdShopZoneCtrl
		 * @see MbSeenAbstractItemCtrl
		 */
		this.getModel = function(id) {
			return $shop.getZone(id);
		};

		/**
		 * Update current item
		 * 
		 * @return promiss to add and return an item
		 * @memberof AmdShopZoneCtrl
		 * @see MbSeenAbstractItemCtrl
		 */
		this.updateModel = function(item) {
			return item.update();
		};



		//--------------------------------------------------------------------
		// Load
		//--------------------------------------------------------------------

		this.addEventHandler(AMD_SHOP_ZONE_SP, function(event) {
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
				eventType: AMD_SHOP_ZONE_SP,
				modelId: itemId
			})
			.then(function() {
				$editor.setTitle('Zone:' + itemId);
			});

	}
});


