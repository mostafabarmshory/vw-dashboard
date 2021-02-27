
mblowfish.view('/seo/links', {
	controllerAs: 'ctrl',
	templateUrl: 'scripts/module-seo/views/links.html',
	groups: ['seo'],
	title: 'Sitemap links',
	icon: 'link',
	controller: function($scope, $seo, $controller, $view) {
		'ngInject';
		// Extends with ItemsController
		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		/*
		 * Overried the function
		 */
		this.getModelSchema = function() {
			return $seo.linkSchema();
		};

		// get seo links
		this.getModels = function(parameterQuery) {
			return $seo.getLinks(parameterQuery);
		};

		// get a seo link
		this.getModel = function(id) {
			return $seo.getLink(id);
		};

		this.init({
			eventType: '/seo/links'
		});
	},
});


//		/**
//		 * To add a new link
//		 * 
//		 * @returns
//		 */
//		this.addLink = function() {
//			$navigator.openPage('seo/links-new');
//		};

		// TODO: use extention and add to the toolbar
		//		var ctrl = this;
		//		this.addActions([{
		//			title: 'New link',
		//			icon: 'add',
		//			action: function() {
		//				ctrl.addLink();
		//			}
		//		}]);