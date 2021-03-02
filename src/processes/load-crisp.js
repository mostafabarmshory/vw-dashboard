export default {
	title: 'Loading Live Chat',
	action: function($window) {
		'ngInject';
		//  Load application
		$window.$crisp = [];
		$window.CRISP_WEBSITE_ID = '55019c32-37d1-46ab-b97e-1b524309deb1';
		$window.loadLibrary('https://client.crisp.chat/l.js');
	}
}