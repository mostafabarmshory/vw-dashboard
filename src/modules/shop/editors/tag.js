
import templatUrl from './tag.html';
/**
@ngdoc Editor
@name /shop/tags/:itemId
@description
TagCtrl Controller of the saasdmCpanelApp
 */
export default {
	templateUrl: templatUrl,
	controllerAs: 'ctrl',
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: function($scope, $shop, $mbTranslate, $state, $location) {
		'ngInject';

		var ctrl = {
			loading: false,
			saving: false,
			edit: false,
			items: []
		};

		function loadTag() {
			if (ctrl.loading) {
				return;
			}
			ctrl.loading = true;
			$shop.getTag($state.params.tagId)//
				.then(function(t) {
					$scope.tag = t;
				}, function() {
					alert($mbTranslate.instant('Failed to load the tag.'));
				})//
				.finally(function() {
					ctrl.loading = false;
				});
		}

		function remove() {
			confirm($mbTranslate.instant('Item will be deleted. There is no undo action.'))//
				.then(function() {
					return $scope.tag.delete();//
				})//
				.then(function() {
					$location.path('/tags');
				}, function() {
					alert($mbTranslate.instant('Fail to delete the tag.'));
				});
		}

		function save() {
			if (ctrl.saving) {
				return;
			}
			ctrl.saving = true;
			$scope.tag.update()//
				.then(function(newTag) {
					$scope.tag = newTag;
					ctrl.edit = false;
				}, function() {
					alert($mbTranslate.instant('Failed to save the tag.'));
				})//
				.finally(function() {
					ctrl.saving = false;
				});
		}

		$scope.tag = {};
		$scope.remove = remove;
		$scope.save = save;
		$scope.ctrl = ctrl;

		loadTag();
	}
}



