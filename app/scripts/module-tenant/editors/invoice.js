
mblowfish.addEditor('/tenant/invoices/:invoiceId', {
	templateUrl: 'scripts/module-tenant/editors/invoice.html',
	controller: function($scope, $rootScope, $state, $location,
		/*$discount,*/ $tenant) {

		/**
		 * Controller status
		 */
		//        $scope.amdDisableId = true;
		var status = {
			invoiceLoading: false,
			gateLoading: false,
			success: true
		};
		var ctrl = {};
		$scope.ctrl = ctrl;
		$scope.status = status;

		function checkState(myInvoice) {
			return myInvoice.state()//
				.then(function(inv) {
					$scope.status.invoiceLoading = false;
					$scope.invoice = inv;
					//			$scope.translateParams.expirationDate = pdateFilter(link.expiry, 'jYYYY/jMM/jDD hh:mm');
				});
		}

		function loadGates() {
			$scope.status.gateLoading = true;
			return $tenant.getGates()//
				.then(function(gatesPag) {
					$scope.gates = gatesPag.items;
					$scope.status.gateLoading = false;
					return gatesPag;
				});
		}

		function pay(backend, discountCode) {
			// create receipt and send to bank receipt page.
			var data = {
				'backend': backend.id,
				'callback': $location.absUrl()
			};
			if (typeof discountCode !== 'undefined' && discountCode !== null) {
				data.discount_code = discountCode;
			}
			$scope.invoice.pay(data)//
				.then(function(receipt) {
					goTo('/receipts/' + receipt.id);
				}, handleException);
		}

		/**
		 * به صفحه دیگر با آدرس داده شده می‌رود
		 */
		function goTo(path) {
			$location.path(path);
		}

		function handleException(error) {
			if (error.status === 401 && $rootScope.app.user.anonymous) {
				$scope.goTo('/users/login');
				return;
			}
			$scope.error = error.message;
			$scope.status.invoiceLoading = false;
			$scope.status.gateLoading = false;
			$scope.status.success = false;
		}

		function checkDiscount(code) {
			// XXX: hadi 1396-11-05: should be used $tenant service to compute discount. $discount service is for other tenants. 
			// XXX: hadi 1396-11-05: RESTs for discounts of super tenant should be added to $tenant service.  

			//		$discount.discount(code)//
			//		.then(function(discount){
			//			if(typeof discount.validation_code === 'undefined' || discount.validation_code === 0){
			//				$scope.discount_message = 'discount is valid';
			//			}else{
			//				switch(discount.validation_code){
			//				case 1:
			//					$scope.discount_message = 'discount is used before';
			//					break;
			//				case 2: 
			//					$scope.discount_message = 'discount is expired';
			//					break;
			//				case 3: 
			//					// discount is not owned by user.
			//					$scope.discount_message = 'discount is not valid';
			//					break;
			//				}
			//			}
			//		}, function(error){
			//			$scope.error = error.data.message;
			//			if(error.status === 404){				
			//				$scope.discount_message = 'discount is not found';
			//			}else{
			//				$scope.discount_message = 'unknown error while get discount info';
			//			}
			//		});
		}

		/**
		 * Load ticket
		 */
		function loadInvoice() {
			if ($scope.status.invoiceLoading === true) {
				return;
			}
			$scope.status.invoiceLoading = true;
			$scope.invoice = null;
			ctrl.items = [];
			return $tenant.getInvoice($state.params.invoiceId)//
				.then(function(inv) {
					$scope.invoice = inv;
					status.invoiceLoading = false;
					return $scope.invoice;
				}, function(error) {
					status.invoiceLoading = false;
					ctrl.error = error;
				});
		}

		function load() {

			// load invoice
			loadInvoice()
				// check state of invoice
				.then(checkState)
				// load gates
				.then(loadGates)
				// handle exceptions
				.catch(handleException);

		}

		$scope.hostUrl = $location.protocol() + '://' + $location.host();
		$scope.pay = pay;
		$scope.checkDiscount = checkDiscount;

		load();
	},
	controllerAs: 'ctrl'
});