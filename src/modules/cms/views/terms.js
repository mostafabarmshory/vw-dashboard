import templateUrl from './terms.html';

export default {
	title: 'Terms',
	controllerAs: 'ctrl',
	templateUrl: templateUrl,
	groups: ['Content Management'],
	icon: 'title',
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
			return $cms.termSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $cms.getTerms(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $cms.getTerm(id);
		};

		this.deleteTerm = function(term, $event) {
			$event.values = [term];
			return $mbActions.exec(AMD_CMS_TERMS_DELETE_ACTION, $event);
		};

		this.init({
			// dispatcher path and internal address
			eventType: AMD_CMS_TERMS_SP,
		});
	},
}



