'use strict';

angular.module('ngMaterialDashboardCms')

	/**
	 * @ngdoc Controllers
	 * @name AmdCmsTermTaxonomyNewCtrl
	 * @description Manage process of creation
	 */
	.controller('AmdCmsTermTaxonomyNewCtrl', function ($scope, $cms, $controller, QueryParameter) {

	    /*
	     * Extends collection controller from MbAbstractCtrl 
	     */
	    angular.extend(this, $controller('MbAbstractCtrl', {
		$scope: $scope
	    }));


	    /**
	     * Search for states
	     * 
	     */
	    this.querySearch = function (query) {
		var queryParameter = new QueryParameter();
		queryParameter.setOrder('id', 'd');
		queryParameter.setQuery(query);
		return $cms.getTerms(queryParameter)
			.then(function (pageList) {
			    return pageList.items;
			});
	    };

	    this.setInitialItem = function (termId) {
		var ctrl = this;
		if (termId) {
		    $cms.getTerm(termId)
			    .then(function (term) {
				ctrl.selectedItem = term;
			    });
		}
	    };

	});
