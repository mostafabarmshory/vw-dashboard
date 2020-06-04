/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



/**
 * @ngdoc controller
 * @name AmdTenantInvoiceController
 * @description Manages view of a invoice
 */
mblowfish.controller('AmdTenantInvoiceController', function($scope, $rootScope, $state, $location,
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
});
