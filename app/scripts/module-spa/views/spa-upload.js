mblowfish.view('/spas-upload', {
	templateUrl: 'scripts/module-spa/views/spa-upload.html',
	title: 'Upload spa',
	icon: 'file_upload',
	groups: ['Applications'],
	controllerAs: 'ctrl',
	controller: function($scope, $tenant, $navigator) {
		'ngInject';
		var ctrl = {
			state: 'relax',
			uploading: false
		};

		/**
		 * Upload an spa file.
		 * 
		 * @returns
		 */
		function fileSelected(element) {
			ctrl.uploading = true;
			return $tenant.putSpa(element[0].lfFile)//
				.then(function(spa) {
					toast('Application is installed successfully.');
					return $navigator.openPage('spas/' + spa.id);
				}, function(ex) {
					alert('Fail to install app: ' + ex.data.message);
				})
				.finally(function() {
					ctrl.uploading = false;
				});
		}

		/*
		 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
		 */
		$scope.ctrl = ctrl;
		$scope.upload = fileSelected;
	},
});