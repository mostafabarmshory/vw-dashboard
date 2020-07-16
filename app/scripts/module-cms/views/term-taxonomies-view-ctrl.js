

mblowfish.addView(AMD_CMS_VIEW_TERM_TAXONOMIES_PATH, {
	title: 'Term taxonomis',
	controller: function($scope, $cms, $controller) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $cms.termTaxonomySchema();
		};

		// get models
		this.getModels = function(parameterQuery) {
			return $cms.getTermTaxonomies(parameterQuery);
		};

		// get a model
		this.getModel = function(id) {
			return $cms.getTermTaxonomy(id);
		};

		// add a model
		this.addModel = function(model) {
			return $cms.putTermTaxonomy(model);
		};

		// delete model
		this.deleteModel = function(model) {
			return $cms.deleteTermTaxonomy(model.id);
		};


		/*
		 * init ctrl
		 */
		this.init({
			eventType: AMD_CMS_TERMTAXONOMIES_SP,
			addAction: {
				title: 'New term-taxonomy',
				icon: 'add',
				dialog: 'views/dialogs/amd-term-taxonomy-new.html'
			},
			deleteAction: {
				title: 'Delete term-taxonomy?'
			},
			actions: []
		});
	},
	controllerAs: 'ctrl',
	templateUrl: 'views/amd-term-taxonomies.html',
	groups: ['Content Management'],
	icon: 'class',
});

