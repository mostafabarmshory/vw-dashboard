
/**
 * @ngdoc directive
 * @name amhSdp.directive:sdpAssetFilter
 * @description # sdpAssetFilter
 */

export default function() {
	return {
		restrict: 'E',
		templateUrl: 'views/directives/sdp-downloaded-link.html',
		scope: {
			item: '='
		},
		controller: function($scope, /*$sdp, */$usr) {
			'ngInject';
			//                      $sdp.asset($scope.item.asset)//
			//                              .then(function (asset) {
			//                                  $scope.fileName = asset.name;
			//                              });//
			$usr.getAccount($scope.item.user)//
				.then(function(user) {
					$scope.user = user;
				});//
		}
	};
}



