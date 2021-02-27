
mblowfish.addEditor('/tenant/tickets/:ticketId', {
	templateUrl: 'scripts/module-tenant/editors/ticket.html',
	controller: function($scope, $state, $tenant, QueryParameter) {
		'ngInject';

		var paginatorParameter = new QueryParameter();
		paginatorParameter.setOrder('creation_dtime', 'd');
		var requests = null;

		/**
		 * Controller status
		 */
		var ctrl = {
            /**
             * Status of the controller
             * 
             * <ul>
             * <li>relax: all things is ok</li>
             * <li>loading: getting data from server</li>
             * <li>error: faced with error, the error will be placed in ctrl.error</li>
             * </ul>
             */
			status: 'relax',
            /**
             * Comments status
             * 
             * <ul>
             * <li>relax: all things is ok</li>
             * <li>loading: getting data from server</li>
             * <li>error: faced with error, the error will be placed in ctrl.commentsError</li>
             * </ul>
             */
			commentsStatus: 'loading',
            /**
             * List of all comments
             */
			comments: []
		};
		$scope.ctrl = ctrl;

		/**
		 * Load ticket
		 */
		function loadTicket() {
			if (ctrl.status === 'loading') {
				return;
			}
			$scope.ticket = null;
			requests = null;
			ctrl.items = [];
			ctrl.status = 'loading';
			return $tenant.getTicket($state.params.ticketId)//
				.then(function(ticket) {
					$scope.ticket = ticket;
					ctrl.status = 'relax';
					ctrl.commentsStatus = 'relax';
					nextPage();
				}, function(error) {
					ctrl.status = 'error';
					ctrl.error = error;
				});
		}

		/**
		 * لود کردن داده‌های صفحه بعد
		 * 
		 * @returns
		 */
		function nextPage() {
			if (ctrl.commentsStatus === 'loading') {
				return;
			}
			if (requests && !requests.hasMore()) {
				return;
			}
			if (requests) {
				paginatorParameter.setPage(requests.next());
			}
			// start state (device list)
			ctrl.commentsStatus = 'loading';
			return $scope.ticket.getComments(paginatorParameter)//
				.then(function(items) {
					requests = items;
					ctrl.comments = ctrl.items.concat(requests.items);
					ctrl.commentsStatus = 'relax';
					ctrl.commentsError = null;
				}, function(error) {
					ctrl.commentsError = error;
					ctrl.commentsStatus = 'error';
				});
		}

		/**
		 * To add new comment
		 */
		function addComment(comment) {
			return $scope.ticket.putComment(comment)//
				.then(function(nc) {
					ctrl.comments.unshift(nc);
				});
		}

		function toggleEdit() {
			$scope.editing = !$scope.editing;
		}

		/**
		 * To save the subject
		 */
		function updateSubject() {
			$scope.ticket.update()
				.then(function(ticket) {
					$scope.editing = false;
					$scope.ticket.subject = ticket.subject;
				});
		}

		loadTicket();
		$scope.addComment = addComment;
		$scope.toggleEdit = toggleEdit;
		$scope.updateSubject = updateSubject;
		$scope.editing = false;
	},
	controllerAs: 'ctrl'
});