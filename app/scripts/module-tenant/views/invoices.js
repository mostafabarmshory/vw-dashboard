mblowfish.addView('/tenant/invoices', {
	templateUrl: 'scripts/module-tenant/views/invoices.html',
	controller: function($scope, $tenant, QueryParameter, $mbTranslate) {

		var paginatorParameter = new QueryParameter();
		var requests = null;
		var ctrl = {
			items: []
		};

		/**
		 * لود کردن داده‌های صفحه بعد
		 * 
		 * @returns
		 */
		function nextPage() {
			if (ctrl.loadingInvoices || (requests && !requests.hasMore())) {
				return;
			}
			if (requests) {
				paginatorParameter.setPage(requests.next());
			}
			ctrl.loadingInvoices = true;
			$tenant.getInvoices(paginatorParameter)//
				.then(function(items) {
					requests = items;
					ctrl.items = ctrl.items.concat(requests.items);
				}, function() {
					alert($mbTranslate.instant('Failed to load invoices.'));
				})
				.finally(function() {
					ctrl.loadingInvoices = false;
				});
		}

		/**
		 * تمام حالت‌های کنترل ررا بدوباره مقدار دهی می‌کند.
		 * 
		 * @returns
		 */
		function reload() {
			requests = null;
			ctrl.items = [];
			nextPage();
		}


		$scope.ctrl = ctrl;
		$scope.nextPage = nextPage;
		$scope.paginatorParameter = paginatorParameter;
		$scope.reload = reload;
		$scope.sortKeys = ['id', 'title', 'amount', 'due_dtime', 'creation_dtime'];
		$scope.sortKeysTitles = ['Id', 'Title', 'Amount', 'Due time', 'creation time'];

	},
	controllerAs: 'ctrl',
});
