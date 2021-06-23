import templateUrl from './tickets.html';
export default {
	access: 'hasAnyRole("tenant.owner")',
	templateUrl: templateUrl,
//	controllerAs: 'ctrl',
	groups: ['Tenant'],
	title: 'Tickets',
	icon: 'question_answer',
	controller: function($scope, $tenant, $navigator, QueryParameter) {
		'ngInject';

		var paginatorParameter = new QueryParameter();
		var requests = null;
		var ctrl = {
			state: 'relax',
			items: []
		};

		/**
		 * لود کردن داده‌های صفحه بعد
		 * 
		 * @returns
		 */
		function nextPage() {
			if (ctrl.status === 'working') {
				return;
			}
			if (requests && !requests.hasMore()) {
				return;
			}
			if (requests) {
				paginatorParameter.setPage(requests.next());
			}
			// start state (device list)
			ctrl.status = 'working';
			$tenant.getTickets(paginatorParameter)//
				.then(function(items) {
					requests = items;
					ctrl.items = ctrl.items.concat(requests.items);
					ctrl.status = 'relax';
				}, function(error) {
					ctrl.status = 'fail';
					ctrl.error = error;
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

		/**
		 * Adds new ticket
		 * 
		 * @memberof AmdTenantTicketsController
		 */
		function add() {
			// get subject of new ticket
			return $navigator.openDialog({
				templateUrl: 'views/dialogs/subject.html',
				model: {
					subject: 'subject'
				}
			})
				.then(function(subject) {
					return $tenant.putTicket({
						subject: subject
					});
				})
				.then(function(ticket) {
					$navigator.openPage('tenant/tickets/' + ticket.id);
				});//
		}
		function remove() { }
		function open() { }

		/*
		 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری
		 * شده است.
		 */
		$scope.items = [];
		$scope.nextPage = nextPage;
		$scope.ctrl = ctrl;

		$scope.add = add;
		$scope.remove = remove;
		$scope.open = open;

		$scope.paginatorParameter = paginatorParameter;
		$scope.reload = reload;
		$scope.sortKeys = ['id', 'creation_dtime'];
		$scope.moreActions = [{
			title: 'New ticket',
			icon: 'add',
			action: add
		}];
	},
}


