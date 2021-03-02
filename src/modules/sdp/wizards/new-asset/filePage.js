import templateUrl from './filePage.html';

export default {
	title: 'Asset File',
	description: 'Each asset is related into a binary file some where in network. Fill the form to define the binary.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($scope, $wizard, $sdp, QueryParameter) {
		'ngInject';

		this.drive = $wizard.data.drive;
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
		this.size = createSetterGetter('size');
		this.mime_type = createSetterGetter('mime_type');
	},

	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.file_name && $wizard.data.drive;
	}
}

