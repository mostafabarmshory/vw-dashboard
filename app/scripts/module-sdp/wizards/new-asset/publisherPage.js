mblowfish.wizardPage(SDP_ASSET_CREATE_WIZARD + '#publisher', {
	title: 'Publisher',
	description: 'There may be one or several publisher for the book, video, or other asset. Search and add them in the form.',
	templateUrl: 'scripts/module-sdp/wizards/new-asset/publisherPage.html',
	controllerAs: 'ctrl',
	controller: function($scope, $sdp, $wizard, QueryParameter, $mbActions) {
		'ngInject';
		this.publishers = $wizard.data.publishers || [];
		var ctrl = this;
		var publisher;
		var queryParameter = new QueryParameter();
		queryParameter.setOrder('id', 'd');

		$scope.$watch('ctrl.publishers', function(categories) {
			$wizard.setData('publishers', categories);
		});

		$sdp.getCategory('publisher')
			.then(function(category) {
				publisher = category;
			}, function() {
				// Publisher not found
			});

		this.categorySearch = function(query) {
			queryParameter.setQuery(query);
			queryParameter.setFilter('parent_id', publisher.id);
			return $sdp.getCategories(queryParameter)
				.then(function(list) {
					return list.items;
				});
		};

		this.createNewCategory = function(name, $event) {
			$event.values = [{
				name: name,
				parent_id: publisher.id
			}];
			$mbActions.exec(SDP_CATEGORIES_CREATE_ACTION, $event)
				.then(function(cats) {
					ctrl.searchText = '';
					_.forEach(cats, function(cat) {
						ctrl.publishers.push(cat);
					});
				});
		};
	}
});