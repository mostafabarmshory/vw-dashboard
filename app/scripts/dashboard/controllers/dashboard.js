/**
 * @ngdoc Controllers
 * @name AmdDashboardCtrl
 * @description Dashboard controller
 * 
 */
angular.module('ngMaterialDashboard').controller('AmdDashboardCtrl', function($scope, $http, $controller, $sce) {
	var url = 'https://www.viraweb123.ir/wb/content/angular-material-dashboard-default-en';

	$scope.url = $sce.trustAsResourceUrl(url);

	/**
	 * Load dashboard data from application settings
	 */
	this.loadDashboardData = function() {
		//        return $http.get(url)
		//        .then(function (data) {
		//            return data.data;
		//        }, function () {
		//            return {
		//                type: 'div'
		//            };
		//        });//
	};
});
