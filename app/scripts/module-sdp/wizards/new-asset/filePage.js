mblowfish.wizardPage(SDP_ASSET_CREATE_WIZARD + '#file', {
	title: 'Asset File',
	description: 'Each asset is related into a binary file some where in network. Fill the form to define the binary.',
	templateUrl: 'scripts/module-sdp/wizards/new-asset/filePage.html',
	controllerAs: 'ctrl',
	controller: function($scope, $wizard, $sdp, QueryParameter) {
		'ngInject';


		var queryParameter = new QueryParameter();
		queryParameter.setOrder('id', 'd');

		//		this.parent = createSetterGetter('parent');
		$scope.$watch('ctrl.drive', function(item) {
			$wizard.setData('drive', item);
		});

		this.driveSearch = function(query) {
			queryParameter.setQuery(query);
			return $sdp.getDrives(queryParameter)
				.then(function(list) {
					return list.items;
				});
		};

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.file_name = createSetterGetter('file_name');
		this.path = createSetterGetter('path');
		this.size = createSetterGetter('size');
		this.mime_type = createSetterGetter('mime_type');
	},

	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.file_name && $wizard.data.drive;
	}
});