import templateUrl from './content-upload.html';
import MbCmsContentsCtrl from '../controllers/MbCmsContentsCtrl';
import $mbCrypto from 'mblowfish/src/services/mbCrypto';


export class ContetnUploadResourceCtrl extends MbCmsContentsCtrl {

	constructor($scope, $q, $mbLog, $cms, $resource) {
		'ngInject';
		super($scope, $q, $mbLog, $cms);
		this.$resource = $resource;

		this.absolute = false;
		this.files = [];

		// init the controller
		this.init();
		$resource.process = () => this.process();
	}

	/**
	 * Sets the absolute mode
	 *
	 * @param {boolean}
	 *            absolute mode of the controler
	 */
	setAbsolute(absolute) {
		this.absolute = absolute;
	}

	/**
	 * Checks if the mode is absolute
	 *
	 * @return absolute mode of the controller
	 */
	isAbsolute() {
		return this.absolute;
	}


	/*
	 * Add answer to controller
	 */
	process() {
		// create data
		var data = {};
		data.name = this.name || $mbCrypto.uuid();
		data.description = this.description || 'Auto loaded content';
		var file = null;
		if (angular.isArray(this.files) && this.files.length) {
			file = this.files[0];
			data.title = file.name;
		}
		// upload data to server
		return this.uploadFile(data, file)//
			.then(function(content) {
				var value = '/api/v2/cms/contents/' + content.id + '/content';
				$resource.setValue(value);
				return value;
			})//
			.catch(function() {
				alert('Failed to create or upload content');
			});
	}
}

export default {
	title: 'Upload',
	icon: 'file_upload',
	templateUrl: templateUrl,
	priority: 1,
	tags: ['image-url', 'url', 'avatar', 'thumbnail'],
	controller: ContetnUploadResourceCtrl
}


