import templateUrl from './categories.html';
export default {
	templateUrl: templateUrl,
	title: 'Categories',
	icon: 'category',
	groups: ['Digital Assets'],
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, MbAction) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.categorySchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getCategories(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getCategory(id);
		};

		this.init({
			eventType: SDP_CATEGORIES_SP,
		});
		

		var ctrl = this;
		$view.getToolbar()
			.addAction(new MbAction({
				title: 'Delete',
				icon: 'delete',
				hide: function() {
					return !ctrl.hasSelected();
				},
				/* @ngInject */
				action: function($event) {
					return ctrl.execOnModel(SEEN_MODEL_DELETE_ACTION, ctrl.getSelection(), $event);
				}
			}))
			.addAction(new MbAction({
				title: 'Edit',
				icon: 'edit',
				hide: function() {
					return !ctrl.hasSelected();
				},
				/* @ngInject */
				action: function($event) {
					return ctrl.execOnModel(SDP_CATEGORIES_EDIT_ACTION, ctrl.getSelection(), $event);
				}
			}))
			.addAction(new MbAction({
				title: 'Preview',
				icon: 'preview',
				hide: function() {
					return ctrl.getSelectionSize() !== 1;
				},
				/* @ngInject */
				action: function($event) {
					return ctrl.execOnModel(SDP_CATEGORIES_DETAILS_ACTION, ctrl.getSelection(), $event);
				}
			}));
	},
}



