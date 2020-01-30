'use strict';

angular.module('ngMaterialDashboardCms')

	/**
	 * @ngdoc function
	 * @name ngMaterialDashboardCms.controller:AmdCmsTermTaxonomyCtrl
	 * @description # TaxonomyCtrl Controller of the ngMaterialDashboardCms
	 */
	.controller('AmdCmsTermTaxonomyCtrl', function ($cms, $translate, $routeParams, QueryParameter) {

	    this.loadingTaxonomy = true;
	    this.savingTaxonomy = false;
	    this.edit = false;
	    this.taxonomy = null;


	    /*
	     * Load the term
	     */
	    this.loadTaxonomy = function () {
		var ctrl = this;
		this.loadingTaxonomy = true;
		$cms.getTermTaxonomy($routeParams.taxonomyId)//
			.then(function (taxonomy) {
			    ctrl.taxonomy = taxonomy;
			    ctrl.loadTaxonomies();
			}, function () {
			    alert($translate.instant('Failed to load taxonomy'));
			})
			.finally(function () {
			    ctrl.loadingTaxonomy = false;
			});
	    };


	    /*
	     * Save term
	     */
	    this.save = function () {
		var ctrl = this;
		this.savingTaxonomy = true;
		this.taxonomy.update()//
			.then(function () {
			    ctrl.edit = false;
			}, function () {
			    alert($translate.instant('Failed to update term'));
			})//
			.finally(function () {
			    ctrl.savingTaxonomy = false;
			});
	    };
	    
	    /*
	     * Load available parent term-taxonomies (term-taxonomies which their term_id is the same as term_id of current taxonomy)
	     */
	    this.loadTaxonomies = function () {
		var ctrl = this;
		var pp = new QueryParameter;
		pp.setFilter('term_id',this.taxonomy.term_id);
		$cms.getTermTaxonomies(pp)
			.then(function (res) {
			    ctrl.termTaxonomies = res.items;
			    ctrl.removeCurrentTaxonomy();
			});
	    };
	    
	    /*
	     * Remove ctrl.taxonomy from the list of term-taxonomies
	     */
	    this.removeCurrentTaxonomy = function () {
		for (var i = 0; i < this.termTaxonomies.length ; i++) {
		    if (this.termTaxonomies[i].id === this.taxonomy.id) {
			this.termTaxonomies.splice(i,1);
			break;
		    }
		}
	    };

	    this.loadTaxonomy();
	});

