
import templateUrl from './spa.html';
import MbSeenAbstractItemEditorCtrl from '../../core/controllers/MbSeenAbstractItemEditorCtrl';


export class MbCmsContentPropertiesEditorCtrl extends MbSeenAbstractItemEditorCtrl {
	constructor($scope, $editor, $q, $tenant, $state) {
		'ngInject';
		super($scope, $editor, $q);
		this.$tenant = $tenant;
		this.$state = $state;
		this.reload();
	}

	/**
	 Reload data
	
	This is called if the model is required to reload.
	 */
	reload() {
		var job = this.$tenant.getSpa(this.$state.params.spaId)//
			.then((model) => {
				this
					.setStorePath(TENANT_SPAS_SP)
					.setTitle('SPA: ' + model.id)
					.setModel(model);
				return model.getPossibleTransitions();
			})
			.then((transList) => this.setTransitions(transList.items));
		// Editor knows which is the current job
		return this.setJob(job);
	};
}


export default {
	templateUrl: templateUrl,
	controller: MbCmsContentPropertiesEditorCtrl,
}
