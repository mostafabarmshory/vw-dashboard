mblowfish.addView(AMD_CMS_VIEW_TERM_TAXONOMIES_PATH, {
	title: 'Term taxonomis',
	controllerAs: 'ctrl',
	templateUrl: 'scripts/module-cms/views/term-taxonomies.html',
	groups: ['Content Management'],
	icon: 'class',
	controller: function($scope, $cms, $controller, $view) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
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

//		// add a model
//		this.addModel = function(model) {
//			return $cms.putTermTaxonomy(model);
//		};
//
//		// delete model
//		this.deleteModel = function(model) {
//			return $cms.deleteTermTaxonomy(model.id);
//		};


		/*
		 * init ctrl
		 */
		this.init({
			eventType: AMD_CMS_TERMTAXONOMIES_SP,
//			addAction: {
//				title: 'New term-taxonomy',
//				icon: 'add',
//				dialog: 'views/dialogs/amd-term-taxonomy-new.html'
//			},
//			deleteAction: {
//				title: 'Delete term-taxonomy?'
//			},
//			actions: []
		});
	},
});

