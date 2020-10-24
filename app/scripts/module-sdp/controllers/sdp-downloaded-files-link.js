
/**
 * @ngdoc controller
 * @name amhSdp.controller:LinkPaymentCtrl
 * @description # LinkPaymentCtrl Controller of the amhSdp
 */
mblowfish.controller('SdpDownloadedFilesLinkCtrl', function($scope, $sdp, QueryParameter) {
	$scope.mainWaiting = true;
	$scope.flag = false;
	var paginatorParameter = new QueryParameter();
	var requests = null;


	/**
	 * لود کردن داده‌های صفحه بعد
	 * 
	 * @returns
	 */
	function nextPage() {
		if ($scope.loadingLinks) {
			return;
		}
		if (requests && !requests.hasMore()) {
			return;
		}
		if (requests) {
			paginatorParameter.setPage(requests.next());
		}
		$scope.loadingLinks = true;
		$sdp.getLinks(paginatorParameter)//
			.then(function(items) {
				$scope.mainWaiting = false;
				$scope.error = null;
				requests = items;
				$scope.items = $scope.items.concat(requests.items);
				if (items.length === 0) {
					$scope.flag = true;
				}
			}, function(error) {
				$scope.error = error;
			})
			.finally(function() {
				$scope.loadingLinks = false;
			});
	}

	/**
	 * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
	 * 
	 * @returns
	 */
	function reload() {
		requests = null;
		$scope.items = [];
		nextPage();
	}

	//	function add() {};
	//	function remove() {};
	//	function open() {}


	/*
	 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری
	 * شده است.
	 */
	$scope.items = [];
	$scope.nextPage = nextPage;
	$scope.paginatorParameter = paginatorParameter;
	$scope.reload = reload;
	$scope.sortKeys = ['id', 'creation_dtime'];

});