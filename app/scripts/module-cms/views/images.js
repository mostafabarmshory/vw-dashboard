
/**
@ngdoc Views
@name CMS Images
@description A view of images
 */
mblowfish.addView(AMD_CMS_VIEW_IMAGES_PATH, {
	title: 'Images',
	templateUrl: 'scripts/module-cms/views/images.html',
	groups: ['Content Management'],
	icon: 'collections',
	controllerAs: 'ctrl',
	controller: function($scope, $view, $cms, $controller, $mbActions) {
		'ngInject';

		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $cms.contentSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $cms.getContents(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $cms.getContent(id);
		};

		// delete account
		this.deleteModel = function(content) {
			return $cms.deleteContent(content.id);
		};

		/**
		Opne the content with an editor
		 */
		this.openEditor = function(content, $event) {
			$event.values = [content];
			return $mbActions.exec(AMD_CMS_CONTENTS_EDIT_ACTION, $event);
		};

		this.init({
			eventType: AMD_CMS_CONTENT_SP,
		});
		this.addFilter('media_type', 'image');
	},
});
