import templateUrl from './content-new.html';
import $mbActions from 'mblowfish/src/services/mbActions';

export class MbCmsContentNewView {

	constructor($scope, $mbCrypto) {
		'ngInject';
		this.savingContent = false;
		this.$scope = $scope;
		this.$mbCrypto = $mbCrypto;
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
			.then(function() {
				reload();
			})
			.finally(function() {
				delete ctrl.savingContent;
			});
	}

	generateRandomName() {
		this.$scope.config.model.name = $mbCrypto.uuid();
	}

	reload() {
		this.$scope.config = {
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

