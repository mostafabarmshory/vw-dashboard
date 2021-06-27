
import MbCmsContentsCtrl from './MbCmsContentsCtrl';
/**

 */
export default class MbCmsContentsUrlCtrl extends MbCmsContentsCtrl {

	constructor($scope, $q, $mbLog, $cms, $resource) {
		'ngInject';
		super($scope, $q, $mbLog, $cms);
		this.$resource = $resource;
		// init the controller
		this.init();
	}

	/**
	 * Sets the absolute mode
	 *
	 * @param {boolean}
	 *            absolute mode of the controler
	 */
	setAbsolute(absolute) {
		this.absolute = absolute;
	};

	/**
	 * Checks if the mode is absolute
	 *
	 * @return absolute mode of the controller
	 */
	isAbsolute() {
		return this.absolute;
	}

	getDomain() {
		// XXX: maso, 2020:
		return '';
	}

	/*
	 * Sets value
	 */
	setSelected(content) {
		this.selected = content;
		var path = '/api/v2/cms/contents/' + content.id + '/content';
		if (this.isAbsolute()) {
			path = getDomain() + path;
		}
		this.$resource.setValue(path);
	}

	isSelected(content) {
		return this.selected && this.selected.id === content.id;
	}
}


