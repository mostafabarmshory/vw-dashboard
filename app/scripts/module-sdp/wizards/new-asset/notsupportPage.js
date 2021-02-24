mblowfish.wizardPage(SDP_ASSET_CREATE_WIZARD + '#notsupport', {
	title: 'Not suppored',
	description: 'The asset type is not supported. Select another one.',
	templateUrl: 'scripts/module-sdp/wizards/new-asset/notsupportPage.html',
	controllerAs: 'ctrl',
	controller: function() {
		'ngInject';
	},
	isPageComplete: function() {
		'ngInject';
		return false;
	}
});