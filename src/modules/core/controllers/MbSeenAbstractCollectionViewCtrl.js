import './MbSeenAbstractCollectionViewCtrl.css';

/**
@ngInject
 */
export default function($scope, $controller,
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

	function runQueryParameterEditorAction(actionId, $event) {
		var ctrl = $view.$handler.$controller;
		return ctrl
			.getModelSchema()
			.then(function(schema) {
				$event = $event || {};
				$event.values = [ctrl.queryParameter];
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
			action: function($event) {
				'ngInject';
				return runQueryParameterEditorAction(SEEN_QP_SORTS_UPDATE_ACTION, $event);
			}
		}))
		.addAction(new MbAction({
			title: 'Update filters',
			icon: 'filter_list',
			action: function($event) {
				'ngInject';
				return runQueryParameterEditorAction(SEEN_QP_FILTERS_UPDATE_ACTION, $event);
			}
		}))
		.addAction(new MbAction({
			title: 'Reload',
			icon: 'repeat',
			action: function() {
				'ngInject';
				return relaodView();
			}
		}))
		.addComponent(new MbComponent({
			template: '<div class="mb-collection-toolbar-input"><input ng-model="ctrl.query" ng-change="ctrl.setQuery(ctrl.query)" ng-model-options="{debounce: 1000}"/><mb-icon size="16">search</mb-icon></div>',
			controllerAs: 'ctrl',
			controller: function($element) {
				'ngInject';
				$element
					.addClass('mb-collection-toolbar-float-left');
				this.setQuery = function(query) {
					var ctrl = $view.$handler.$controller;
					ctrl.setQueryString(query);
				};
			}
		}));

}



