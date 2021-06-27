import templateUrl from './content-new.html';
import $mbActions from 'mblowfish/src/services/mbActions';
import $mbCrypto from 'mblowfish/src/services/mbCrypto';

export class MbCmsContentNewView {

	constructor() {
		'ngInject';
		this.savingContent = false;
		this.reload();
	}

	cancel() {
		this.reload();
	}

	add(config) {
		this.savingContent = true;
		var data = config.model;
		if (_.isUndefined(data.title)) {
			data.title = data.name;
		}
		if (config.files && config.files.length > 0) {
			data.file = config.files[0];
		}
		return $mbActions
			.exec(AMD_CMS_CONTENTS_CREATE_ACTION, {
				values: [data],
			})
			.then(() => this.reload())
			.finally(() => delete this.savingContent);
	}

	generateRandomName() {
		this.config.model.name = $mbCrypto.uuid();
	}

	reload() {
		this.config = {
			model: {},
			files: []
		};
		this.generateRandomName();
	}

}

export default {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Upload',
	templateUrl: templateUrl,
	groups: ['Content Management'],
	icon: 'cloud_upload',
	controller: MbCmsContentNewView,
}

