import templateUrl from './images.html';
/**
@ngdoc Views
@name CMS Images
@description A view of images
 */
export default {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Images',
	templateUrl: templateUrl,
	groups: ['Content Management'],
	icon: 'collections',
//	controllerAs: 'ctrl',
	controller: function($scope, $view, $cms, $controller, $mbActions, $amdCmsEditors) {
		'ngInject';
		
		//-----------------------------------------------------------------------
		// Utilities
		//-----------------------------------------------------------------------
		function contentToImage(content){
			var imagePath = '/api/v2/cms/contents/' + content.id + '/content';
			var image = '<img src="' + imagePath + '" />';
			return image;
		}

		//-----------------------------------------------------------------------
		// Controller
		//-----------------------------------------------------------------------
		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
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

		this.openMenu = function(content, $mdMenu, $event) {
			this.editors = $amdCmsEditors.getEditors(content.mime_type);
			return $mdMenu.open($event);
		};

		this.deleteImage = function(/*content, $event*/) {
			// TODO:
		};

		this.openProperties = function(content) {
			return $mbActions.exec(AMD_CMS_CONTENTS_PROPERTIES_ACTION, {
				values: [content],
			});
		};
		
		this.loadContentDargData = function(content, $event) {
			var dataTransfer = $event.originalEvent.dataTransfer;

			var imagePath = '/api/v2/cms/contents/' + content.id + '/content';
			var dragImage = angular.element('<img width="200" src="' + imagePath + '" />');
			dataTransfer.setData('text/html', contentToImage(content));
			dataTransfer.setData('text/plain', imagePath);
			dataTransfer.setData('text/uri-list', imagePath);
			dataTransfer.setDragImage(dragImage[0], 0, 0);
		};

		this.init({
			eventType: AMD_CMS_CONTENT_SP,
		});
		this.addFilter('media_type', 'image');
	},
}



