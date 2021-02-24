

mblowfish.editor('/welcome', {
	title: 'Welcome',
	description: 'ViraWeb123 Dashboard help board',
	controllerAs: 'ctrl',
	template: '<iframe class="mb-module-iframe" ng-src="{{src}}"></iframe>',
	groups: ['Utilities'],
	controller: function($scope, $sce) {
		'ngInject';
		var url = 'https://www.viraweb123.ir/wb/content/angular-material-dashboard-default-';
		$scope.src = $sce.trustAsResourceUrl(url + 'en');
	},
});