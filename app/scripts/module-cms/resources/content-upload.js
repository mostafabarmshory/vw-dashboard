
mblowfish.addResource('cms-upload', {
	title: 'Upload',
	icon: 'file_upload',
	templateUrl: 'scripts/module-cms/resources/content-upload.html',
	controllerAs: 'ctrl',
	priority: 1,
	tags: ['image-url', 'url', 'avatar', 'thumbnail'],
	controller: function($scope, $resource, $mbCrypto, $controller) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbSeenCmsContentsCtrl', {
			$scope: $scope
		}));

		this.absolute = false;
		this.files = [];
		var ctrl = this;

		/**
		 * Sets the absolute mode
		 *
		 * @param {boolean}
		 *            absolute mode of the controler
		 */
		this.setAbsolute = function(absolute) {
			this.absolute = absolute;
		};

		/**
		 * Checks if the mode is absolute
		 *
		 * @return absolute mode of the controller
		 */
		this.isAbsolute = function() {
			return this.absolute;
		};

		/*
		 * Add answer to controller
		 */
		function process() {
			// create data
			var data = {};
			data.name = ctrl.name || $mbCrypto.uuid();
			data.description = ctrl.description || 'Auto loaded content';
			var file = null;
			if (angular.isArray(ctrl.files) && ctrl.files.length) {
				file = ctrl.files[0].lfFile;
				data.title = file.name;
			}
			// upload data to server
			return ctrl.uploadFile(data, file)//
				.then(function(content) {
					var value = '/api/v2/cms/contents/' + content.id + '/content';
					//					if (ctrl.isAbsolute()) {
					//						value = getDomain() + value;
					//					}
					$resource.setValue(value);
					return value;
				})//
				.catch(function() {
					alert('Failed to create or upload content');
				});
		}

		// init the controller
		this.init();
		$resource.process = process;
	}
});


