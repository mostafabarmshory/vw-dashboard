
import templateUrl from './messages.html';
import './messages.css';

export default {
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($mbActions, $element, $usr, $mbDispatcher) {
		'ngInject';

		function updateElement() {
			$usr.getMessages()
				.then(function(list) {
					if (list.items.length) {
						$element.addClass('message-recived');
					} else {
						$element.removeClass('message-recived');
					}
				});
		}

		this.openMessages = function($event) {
			$mbActions.exec(AMD_ACCOUNT_MESSAGES_ACTION, $event);
		};

		updateElement();

		$mbDispatcher.on(AMD_ACCOUNT_MESSAGES_SP, function() {
			updateElement();
		});
	}
}


