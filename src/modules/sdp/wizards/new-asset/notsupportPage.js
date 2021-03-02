import templateUrl from './notsupportPage.html';

export default {
	title: 'Not suppored',
	description: 'The asset type is not supported. Select another one.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function() {
		'ngInject';
	},
	isPageComplete: function() {
		'ngInject';
		return false;
	}
}

