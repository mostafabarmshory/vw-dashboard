
import templateUrl from './messages.html';
import MbSeenAbstractCollectionCtrl from '../../core/controllers/MbSeenAbstractCollectionCtrl';

export class MessageSideNavCtrl extends MbSeenAbstractCollectionCtrl {

	constructor($scope, $q, $mbLog, $mbActions, QueryParameter, $usr) {
		'ngInject';
		super($scope, $q, $mbLog, $mbActions, QueryParameter);
		this.$usr = $usr;
		this.init({
			eventType: AMD_ACCOUNT_MESSAGES_SP
		});
	}

	// Override the schema function
	getModelSchema() {
		return this.$usr.messageSchema();
	};

	// get contents
	getModels(parameterQuery) {
		return this.$usr.getMessages(parameterQuery);
	};

	// get a content
	getModel(id) {
		return this.$usr.getMessage(id);
	};

	// delete account
	deleteModel(item) {
		return this.$usr.deleteMessage(item.id);
	};
}

export default {
	title: 'Messages',
	description: 'Navigate all system messages',
	templateUrl: templateUrl,
	locked: 'false',
	position: 'end',
	controllerAs: 'ctrl',
	controller: MessageSideNavCtrl
}
