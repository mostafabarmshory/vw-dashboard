mblowfish.wizardPage(SDP_ASSET_CREATE_WIZARD + '#tags', {
	title: 'Tags',
	description: 'Clasify all assets with tags, hash tags and label.',
	templateUrl: 'scripts/module-sdp/wizards/new-asset/tagsPage.html',
	controllerAs: 'ctrl',
	controller: function($scope, $sdp, $wizard, QueryParameter, $mbActions) {
		'ngInject';
		this.tags = $wizard.data.tags || [];
		var ctrl = this;
		var queryParameter = new QueryParameter();
		queryParameter.setOrder('id', 'd');

		$scope.$watch('ctrl.tags', function(tags) {
			$wizard.setData('tags', tags);
		});

		this.tagSearch = function(query) {
			queryParameter.setQuery(query);
			return $sdp.getTags(queryParameter)
				.then(function(list) {
					return list.items;
				});
		};
		
		
		this.createNewTag = function(name, $event){
			$event.values = [{
				name: name
			}];
			$mbActions.exec(SDP_TAGS_CREATE_ACTION, $event)
				.then(function(tags){
					ctrl.searchText = '';
					_.forEach(tags, function(tag){
						ctrl.tags.push(tag);
					});
				});
		};
	},
	nextPage: function() {
		return SDP_ASSET_CREATE_WIZARD + '#file';
	}
});