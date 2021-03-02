import templateUrl from './genrePage.html';
export default {
	title: 'Genre',
	description: 'There may be one or many genre for a book, video, or other asset. Search and add them in the form.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($scope, $sdp, $wizard, QueryParameter, $mbActions) {
		'ngInject';
		this.genres = $wizard.data.genres || [];
		var ctrl = this;
		var genre;
		var queryParameter = new QueryParameter();
		queryParameter.setOrder('id', 'd');

		$scope.$watch('ctrl.genres', function(categories) {
			$wizard.setData('genres', categories);
		});

		$sdp.getCategory('genre')
			.then(function(category) {
				genre = category;
			}, function() {
				// Publisher not found
			});

		this.categorySearch = function(query) {
			queryParameter.setQuery(query);
			queryParameter.setFilter('parent_id', genre.id);
			return $sdp.getCategories(queryParameter)
				.then(function(list) {
					return list.items;
				});
		};

		this.createNewCategory = function(name, $event) {
			$event.values = [{
				name: name,
				parent_id: genre.id
			}];
			$mbActions.exec(SDP_CATEGORIES_CREATE_ACTION, $event)
				.then(function(cats) {
					ctrl.searchText = '';
					_.forEach(cats, function(cat) {
						ctrl.genres.push(cat);
					});
				});
		};
	}
}


