
mblowfish.addView('/seo/crawled-links', {
	templateUrl: 'views/seo/views/crawled-links.html',
	controller: function($scope, $navigator, $mbTranslate, $seo, $controller, $mbActions) {
		'ngInject';

		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

		/*
		 * Override the function
		 */
		this.getModelSchema = function() {
			return $seo.contentSchema();
		};

		// get crawled links
		this.getModels = function(parameterQuery) {
			return $seo.getContents(parameterQuery);
		};

		// get a crawled link
		this.getModel = function(id) {
			return $seo.getContent(id);
		};

		// delete crawled link
		this.deleteModel = function(item) {
			return item.delete();
		};

		this.init({
			eventType: '/seo/crawled-links'
		});

		/**
		 * Upload content to pbobject
		 * 
		 * @param pobject
		 */
		this.upload = function(pobject) {
			$navigator
				.openDialog({
					templateUrl: 'views/dialogs/select-file.html',
					config: {
						_files: []
					}
				})//
				.then(function(config) {
					return pobject.uploadValue(config.files[0].lfFile);//
				}, function() { })
				.catch(function() {
					alert($mbTranslate.instant('Failed to upload content'));
				});
		};

		this.openWithRender = function(content) {
			return $mbActions.exec(AMD_SEO_CONTENTS_RENDER_ACTION, {
				values: [content]
			});
		};
	},
	controllerAs: 'ctrl',
	groups: ['seo'],
	title: 'Crawled links',
	icon: 'public'
});