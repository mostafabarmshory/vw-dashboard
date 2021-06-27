
import * as Constants from '../Constants';
import templateUrl from './category.html';
import MbCmsTermTaxonomiesCtrl from '../controllers/MbCmsTermTaxonomiesCtrl';

export class CategoryResouceCtrl extends MbCmsTermTaxonomiesCtrl {

	constructor($scope, $q, $mbLog, $cms, $resource) {
		'ngInject';
		super($scope, $q, $mbLog, $cms);

		$scope.multi = false;
		this.value = [];
		this.multi = false;
		this.$resource = $resource;
	}
	
	toggleSelected(item) {
		if (this.isSelected(item)) {
			var index = this.value.indexOf(item);
			this.value.splice(index, 1);
		} else {
			this.value.push(item);
		}
		this.$resource.setValue(this.value);
	}

	isSelected(item) {
		return this.value.indexOf(item) >= 0;
	}
}

export default {
	tags: [Constants.AMD_CMS_TERMTAXONOMIES_RT],
	title: 'Category',
	icon: 'label',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	priority: 8,
	controller: CategoryResouceCtrl,
}


