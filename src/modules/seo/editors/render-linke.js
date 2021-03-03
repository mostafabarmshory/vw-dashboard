import templateUrl from './render-link.html';


export default {
	templateUrl: templateUrl,
	controller: function($scope, $element, $state, $sce, $seoContent, $seo) {
		'ngInject';
		// controller attributes
		/*
		 * loading, 404, 500
		 */
		this.status = 'loading';
		this.seoContent = null;
		$scope.options = {
			removeAngularjsMDTags: true,
			removeAngularjsTags: true,
			removeStyle: true
		};
		$scope.editable = true;

		/**
		 * Load SEO Content
		 */
		this.loadSeoContent = function(contetnId) {
			var ctrl = this;
			$seo.getContent(contetnId)
				.then(function(content) {
					ctrl.seoContent = content;
					// Load secure path
					ctrl.currentContenttUrl = $sce.trustAsResourceUrl(ctrl.seoContent.url);
				});
		};

		/**
		 * Creates and upload the preview of the page
		 */
		this.uploadPreview = function(options) {
			var ctrl = this;
			$seoContent.optimize(this.getSeoContentHtml(), options)
				.then(function(optimizedHtml) {
					return ctrl.seoContent.uploadValue(optimizedHtml);
				})//
				.then(function(newSeoContent) {
					ctrl.seoContent = newSeoContent;
				});
		};

		this.getSeoContentHtml = function() {
			var iframe = $element.find('iframe')[0];

			var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
			var html = new XMLSerializer().serializeToString(innerDoc);

			return html;
		};

		this.saveContent = function() {
			return this.seoContent.update();
		};

		// load controller
		if ($state.params.crawledLinkId) {
			this.loadSeoContent($state.params.crawledLinkId);
		} else {
			this.status = '404';
		}
	},
	controllerAs: 'ctrl'
}

