import mblowfish from 'mblowfish';

import './seen/backup';
import './seen/bank';
import './seen/cms';
import './seen/monitor';
import './seen/sdp';
import './seen/seo';
import './seen/shop';
import './seen/supertenant';
import './seen/tenant';
import './seen/user';

import Constants from './Constants';
import chatAction from './actions/crisp-chat';
import modelDeleteAction from './actions/model-delete';
import modelTransitionAction from './actions/model-transitions-create';
import modelUpdateAction from './actions/model-update';
import queryParamFilterUpdateAction from './actions/query-parameter-filters-update';
import queryParamSortUpdateAction from './actions/query-parameter-sorts-update';

import MbSeenAbstractBinaryItemCtrl from './controllers/MbSeenAbstractBinaryItemCtrl';
import MbSeenAbstractCollectionCtrl from './controllers/MbSeenAbstractCollectionCtrl';
import MbSeenAbstractCollectionViewCtrl from './controllers/MbSeenAbstractCollectionViewCtrl';
import MbSeenAbstractCtrl from './controllers/MbSeenAbstractCtrl';
import MbSeenAbstractItemCtrl from './controllers/MbSeenAbstractItemCtrl';
import MbSeenAbstractItemEditorCtrl from './controllers/MbSeenAbstractItemEditorCtrl';

import mbPaginationBarDirective from './directives/mbPaginationBar';

import welcomeEditor from './editors/welcome';

import PaginatedCollectionFactory from './factories/PaginatedCollection';
import QueryParameterFactory from './factories/QueryParameter';
import SeenObjectFactory from './factories/SeenObject';
import VwLayoutProviderDefaultFactory from './factories/VwLayoutProviderDefault';

import qpFilterResource from './resources/query-parameter-filters';
import qpSortResource from './resources/query-parameter-sorts';

import modelTransitionPropertyWizardPage from './wizards/model-transition-data/transition-properties';
import modelTransitionWizard from './wizards/model-transition-data/wizard';
mblowfish
	.constant(Constants)
	// actions
	.action(Constants.AMD_ACCOUNT_CHAT_ACTION, chatAction)
	.action(Constants.SEEN_MODEL_DELETE_ACTION, modelDeleteAction)
	.action(Constants.SEEN_MODEL_TRANSITIONS_CREATE, modelTransitionAction)
	.action(Constants.SEEN_MODEL_UPDATE_ACTION, modelUpdateAction)
	.action(Constants.SEEN_QP_FILTERS_UPDATE_ACTION, queryParamFilterUpdateAction)
	.action(Constants.SEEN_QP_SORTS_UPDATE_ACTION, queryParamSortUpdateAction)

	// controllers
	.controller('MbSeenAbstractBinaryItemCtrl', MbSeenAbstractBinaryItemCtrl)
	.controller('MbSeenAbstractCollectionCtrl', MbSeenAbstractCollectionCtrl)
	.controller('MbSeenAbstractCollectionViewCtrl', MbSeenAbstractCollectionViewCtrl)
	.controller('MbSeenAbstractCtrl', MbSeenAbstractCtrl)
	.controller('MbSeenAbstractItemCtrl', MbSeenAbstractItemCtrl)
	.controller('MbSeenAbstractItemEditorCtrl', MbSeenAbstractItemEditorCtrl)

	//directives
	.directive('mbPaginationBar', mbPaginationBarDirective)

	// editors
	.editor('/welcome', welcomeEditor)

	// >> factories
	.factory('PaginatedCollection', PaginatedCollectionFactory)
	.factory('QueryParameter', QueryParameterFactory)
	.factory('SeenObject', SeenObjectFactory)
	.factory('VwLayoutProviderDefault', VwLayoutProviderDefaultFactory)

	// resources
	.addResource('seen.qp.filters.rt', qpFilterResource)
	.addResource('seen.qp.sorts.rt', qpSortResource)

	// wizards
	.wizardPage(Constants.SEEN_MODEL_TRANSITION_DATA_WIZARD + '#properties', modelTransitionPropertyWizardPage)
	.wizard(Constants.SEEN_MODEL_TRANSITION_DATA_WIZARD, modelTransitionWizard)


	//<< end
	;
