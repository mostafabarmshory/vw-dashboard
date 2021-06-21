import templateUrl from './term-taxonomies.html';
import MbSeenAbstractCollectionViewCtrl from '../../core/controllers/MbSeenAbstractCollectionViewCtrl';
import $mbActions from 'mblowfish/src/services/mbActions';


export class MbCmsTermTaxonomisCollectionViewCtrl extends MbSeenAbstractCollectionViewCtrl {
	constructor($view, $scope, $q, $mbLog, MbAction, MbComponent, $cms) {
		'ngInject';
		super($view, $scope, $q, $mbLog, MbAction, MbComponent);
		this.$cms = $cms;

		this.init({
			// dispatcher path and internal address
			eventType: AMD_CMS_TERMTAXONOMIES_SP
		});
	}

	// Override the schema function
	getModelSchema() {
		return this.$cms.termTaxonomySchema();
	}

	// get models
	getModels(parameterQuery) {
		return this.$cms.getTermTaxonomies(parameterQuery);
	}

	// get a model
	getModel(id) {
		return this.$cms.getTermTaxonomy(id);
	}

	deleteTermTaxonomy(termTaxonomy, $event) {
		$event.values = [termTaxonomy];
		$mbActions.exec(AMD_CMS_TERMTAXONOMIES_DELETE_ACTION, $event);
	}
}


export default {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Term taxonomis',
	//	controllerAs: 'ctrl',
	templateUrl: templateUrl,
	groups: ['Content Management'],
	icon: 'class',
	controller: MbCmsTermTaxonomisCollectionViewCtrl,
}




