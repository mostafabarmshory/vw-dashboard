
import templateUrl from './messages.html';

export default {
	title: 'Messages',
	description: 'Navigate all system messages',
	templateUrl: templateUrl,
	locked: 'false',
	position: 'end',
	controllerAs: 'ctrl',
	controller: function($scope, $usr, $controller) {
		'ngInject';

		/*
		 * Extends collection controller
		 */
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $usr.messageSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $usr.getMessages(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $usr.getMessage(id);
		};

		// delete account
		this.deleteModel = function(item) {
			return $usr.deleteMessage(item.id);
		};

		this.init({
			eventType: AMD_ACCOUNT_MESSAGES_SP
		});
	}
}
