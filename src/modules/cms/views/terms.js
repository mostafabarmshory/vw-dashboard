import templateUrl from './terms.html';
import MbSeenAbstractCollectionViewCtrl from '../../core/controllers/MbSeenAbstractCollectionViewCtrl';
import $mbActions from 'mblowfish/src/services/mbActions';


export class MbCmsTermsCollectionViewCtrl extends MbSeenAbstractCollectionViewCtrl {
	constructor($view, $scope, $q, $mbLog, MbAction, MbComponent, $cms) {
		'ngInject';
		super($view, $scope, $q, $mbLog, MbAction, MbComponent);
		this.$cms = $cms;

		this.init({
			// dispatcher path and internal address
			eventType: AMD_CMS_TERMS_SP,
		});
	}

	// Override the schema function
	getModelSchema() {
		return this.$cms.termSchema();
	}

	// get contents
	getModels(parameterQuery) {
		return this.$cms.getTerms(parameterQuery);
	}

	// get a content
	getModel(id) {
		return this.$cms.getTerm(id);
	}

	deleteTerm(term, $event) {
		$event.values = [term];
		return $mbActions.exec(AMD_CMS_TERMS_DELETE_ACTION, $event);
	}
}

export default {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Terms',
	templateUrl: templateUrl,
	groups: ['Content Management'],
	icon: 'title',
	controller: MbCmsTermsCollectionViewCtrl,
}



