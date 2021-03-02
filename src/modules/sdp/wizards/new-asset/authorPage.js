import templateUrl from './authorPage.html';

export default {
	title: 'Authors	',
	description: 'There may be one or many author for a book, video, or other asset. Search and add them in the form.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($scope, $sdp, $wizard, QueryParameter, $mbActions) {
		'ngInject';
		this.authors = $wizard.data.authors || [];
		var ctrl = this;
		var author;
		var queryParameter = new QueryParameter();
		queryParameter.setOrder('id', 'd');

		$scope.$watch('ctrl.authors', function(categories) {
			$wizard.setData('authors', categories);
		});

		$sdp.getCategory('author')
			.then(function(category) {
				author = category;
			}, function() {
				// Publisher not found
			});

		this.categorySearch = function(query) {
			queryParameter.setQuery(query);
			queryParameter.setFilter('parent_id', author.id);
			return $sdp.getCategories(queryParameter)
				.then(function(list) {
					return list.items;
				});
		};

		this.createNewCategory = function(name, $event) {
			$event.values = [{
				name: name,
				parent_id: author.id
			}];
			$mbActions.exec(SDP_CATEGORIES_CREATE_ACTION, $event)
				.then(function(cats) {
					ctrl.searchText = '';
					_.forEach(cats, function(cat) {
						ctrl.authors.push(cat);
					});
				});
		};
	}
}


