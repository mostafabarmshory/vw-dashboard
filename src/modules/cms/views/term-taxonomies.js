import templateUrl from './term-taxonomies.html';

export default {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Term taxonomis',
//	controllerAs: 'ctrl',
	templateUrl: templateUrl,
	groups: ['Content Management'],
	icon: 'class',
	controller: function($scope, $cms, $controller, $view, $mbActions) {
		'ngInject';
		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
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

		this.deleteTermTaxonomy = function(termTaxonomy, $event) {
			$event.values = [termTaxonomy];
			$mbActions.exec(AMD_CMS_TERMTAXONOMIES_DELETE_ACTION, $event);
		};

		this.init({
			eventType: AMD_CMS_TERMTAXONOMIES_SP,
		});
	},
}




