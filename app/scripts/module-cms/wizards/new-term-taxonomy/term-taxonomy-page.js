

mblowfish.wizardPage(AMD_CMS_TERMTAXONOMY_NEW_WIZARD + '#term-taxonomy', {
	title: 'Tearm-Taxonomy',
	description: 'A term taxonomy is a low level labeling system.',
	templateUrl: 'scripts/module-cms/wizards/new-term-taxonomy/term-taxonomy-page.html',
	controllerAs: 'ctrl',
	controller: function($wizard, $cms, QueryParameter) {
		'ngInject';

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.taxonomy = createSetterGetter('taxonomy');
		this.description = createSetterGetter('description');

		this.setTerm = function(term) {
			var termId;
			if (term) {
				termId = term.id;
			}
			$wizard.setData('term_id', termId);
		}

		/**
		 * Search for states
		 * 
		 */
		this.querySearch = function(query) {
			var queryParameter = new QueryParameter();
			queryParameter.setOrder('id', 'd');
			queryParameter.setQuery(query);
			return $cms.getTerms(queryParameter)
				.then(function(pageList) {
					return pageList.items;
				});
		};
	},
	isPageComplete: function($wizard) {
		'ngInject';
		return $wizard.data.taxonomy &&
			$wizard.data.term_id;
	}
});


