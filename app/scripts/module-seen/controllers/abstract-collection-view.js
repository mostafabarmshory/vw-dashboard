
mblowfish.controller('SeenAbstractCollectionViewCtrl', function($scope, $controller,
	$mbActions, MbAction, MbComponent,
	$view) {

	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	}));


	function relaodView(newQueryParam) {
		var ctrl = $view.$handler.$controller;
		if (newQueryParam) {
			_.assign(ctrl.queryParameter, newQueryParam);
		}
		return ctrl.reload();
	}

	function runQueryParameterEditorAction(actionId) {
		var ctrl = $view.$handler.$controller;
		return ctrl
			.getModelSchema()
			.then(function(schema) {
				return $mbActions.exec(actionId, {
					values: [ctrl.queryParameter],
					schema: schema,
				});
			})
			.then(relaodView);
	}

	$view.getToolbar()
		.addAction(new MbAction({
			title: 'Update sorts',
			icon: 'sort',
			action: function() {
				return runQueryParameterEditorAction(SEEN_QP_SORTS_UPDATE_ACTION);
			}
		}))
		.addAction(new MbAction({
			title: 'Update filters',
			icon: 'filter_list',
			action: function() {
				return runQueryParameterEditorAction(SEEN_QP_FILTERS_UPDATE_ACTION);
			}
		}))
		.addAction(new MbAction({
			title: 'Reload',
			icon: 'repeat',
			action: function(){
				return relaodView();
			}
		}))
		.addComponent(new MbComponent({
			template: '<div class="mb-collection-toolbar-input"><input ng-model="ctrl.query" ng-change="ctrl.setQuery(ctrl.query)" ng-model-options="{debounce: 1000}"/><mb-icon size="16">search</mb-icon></div>',
			controllerAs: 'ctrl',
			controller: function($element) {
				$element
					.addClass('mb-collection-toolbar-float-left');
				this.setQuery = function(query) {
					var ctrl = $view.$handler.$controller;
					ctrl.setQueryString(query);
				}
			}
		}))
		;

});
