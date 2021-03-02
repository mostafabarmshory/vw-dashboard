import templateUrl from './drives.html';
/**

Drive attributes:

- id
- title
- description
- driver
- home
- creation_dtime
- modif_dtime

 */
export default {
	title: 'Storages',
	icon: 'storage',
	groups: ['Digital Assets'],
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, MbAction) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
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

		// delete account
		this.deleteModel = function(asset) {
			return $sdp.deleteDrive(asset.id);
		};

		this.init({
			eventType: SDP_DRIVES_SP,
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
					return ctrl.execOnModel(SDP_DRIVES_EDIT_ACTION, ctrl.getSelection(), $event);
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
					return ctrl.execOnModel(SDP_DRIVES_DETAILS_ACTION, ctrl.getSelection(), $event);
				}
			}));
	},
}


