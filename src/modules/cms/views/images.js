import templateUrl from './images.html';
import { MbCmsContentsCollectionViewCtrl } from './contents';


//-----------------------------------------------------------------------
// Utilities
//-----------------------------------------------------------------------
function contentToImage(content) {
	var imagePath = '/api/v2/cms/contents/' + content.id + '/content';
	var image = '<img src="' + imagePath + '" />';
	return image;
}


export class MbCmsImagesCollectionViewCtrl extends MbCmsContentsCollectionViewCtrl {

	constructor($view, $scope, $mbLog, MbAction, MbComponent, $cms, $q, $location, $amdCmsEditors) {
		'ngInject';
		super($view, $scope, $mbLog, MbAction, MbComponent, $cms, $q, $location, $amdCmsEditors)
		this.init({
			eventType: AMD_CMS_CONTENT_SP,
		});
		this.addFilter('media_type', 'image');
	}


	deleteImage(/*content, $event*/) {
		// TODO:
	}

	loadContentDargData(content, $event) {
		var dataTransfer = $event.originalEvent.dataTransfer;

		var imagePath = '/api/v2/cms/contents/' + content.id + '/content';
		var dragImage = angular.element('<img width="200" src="' + imagePath + '" />');
		dataTransfer.setData('text/html', contentToImage(content));
		dataTransfer.setData('text/plain', imagePath);
		dataTransfer.setData('text/uri-list', imagePath);
		dataTransfer.setDragImage(dragImage[0], 0, 0);
	};
}

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
	controller: MbCmsImagesCollectionViewCtrl,
}



