
mblowfish.addView(AMD_CMS_VIEW_TERMS_PATH, {
	title: 'Terms',
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

		// delete account
		this.deleteModel = function(model) {
			var ctrl = this;
			return $cms.deleteTerm(model.id)
				.then(function() {
					ctrl.reload();
				});
		};

		// adding new term
		this.addModel = function(model) {
			return $cms.putTerm(model);
		};

		this.init({
			// dispatcher path and internal address
			eventType: AMD_CMS_TERMS_SP,

			// add creation actions
			addAction: {
				title: 'New term',
				icon: 'add',
				dialog: 'views/dialogs/amd-term-new.html'
			},
			// delete action
			deleteAction: {
				title: 'Delete term?'
			},
			// list of actions in the view
			actions: []
		});
	},
	controllerAs: 'ctrl',
	templateUrl: 'views/amd-terms.html',
	groups: ['Content Management'],
	icon: 'title',
});

