import templateUrl from './image-url.html';
import MbCmsContentsUrlCtrl from '../controllers/MbCmsContentUrlResourceCtrl';

export default {
	title: 'Images',
	icon: 'image',
	templateUrl: templateUrl,
	priority: 10,
	tags: ['image-url', 'avatar', 'thumbnail'],
//	controllerAs: 'ctrl',
	controller: MbCmsContentsUrlCtrl,
}