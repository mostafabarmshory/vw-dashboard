
export default {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Crawled links',
	groups: ['seo'],
	icon: 'public',
	templateUrl: 'scripts/module-seo/views/crawled-links.html',
//	controllerAs: 'ctrl',
	controller: function($scope, $view, $seo, $controller) {
		'ngInject';

		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		/*
		 * Override the function
		 */
		this.getModelSchema = function() {
			return $seo.contentSchema();
		};

		// get crawled links
		this.getModels = function(parameterQuery) {
			return $seo.getContents(parameterQuery);
		};

		// get a crawled link
		this.getModel = function(id) {
			return $seo.getContent(id);
		};

		this.init({
			eventType: '/seo/crawled-links'
		});
	}
}
//
//		/**
//		 * Upload content to pbobject
//		 * 
//		 * @param pobject
//		 */
//		this.upload = function(pobject) {
//			$navigator
//				.openDialog({
//					templateUrl: 'views/dialogs/select-file.html',
//					config: {
//						_files: []
//					}
//				})//
//				.then(function(config) {
//					return pobject.uploadValue(config.files[0]);//
//				}, function() { })
//				.catch(function() {
//					alert($mbTranslate.instant('Failed to upload content'));
//				});
//		};
//
//		this.openWithRender = function(content) {
//			return $mbActions.exec(AMD_SEO_CONTENTS_RENDER_ACTION, {
//				values: [content]
//			});
//		};