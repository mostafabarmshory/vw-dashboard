
mblowfish.addView(AMD_CMS_VIEW_CONTENT_NEW_PATH, {
	title: 'Upload',
	controllerAs: 'ctrl',
	templateUrl: 'scripts/module-cms/views/content-new.html',
	groups: ['Content Management'],
	icon: 'cloud_upload',
	controller: function($scope, $mbActions, $mbCrypto) {
		'ngInject';

		var ctrl = this;

		function cancel() {
			reload();
		}

		function add(config) {
			ctrl.savingContent = true;
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
				.then(function(){
					reload();
				})
				.finally(function() {
					delete ctrl.savingContent;
				});
		}

		function generateRandomName() {
			$scope.config.model.name = $mbCrypto.uuid();
		}

		function reload() {
			$scope.config = {
				model: {},
				files: []
			};
			generateRandomName();
		}

		_.assign(ctrl, {
			savingContent: false,

			cancel: cancel,
			add: add,
			generateRandomName: generateRandomName,
		});

		reload();
	},
});