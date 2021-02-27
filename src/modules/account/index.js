import mblowfish from 'mblowfish';

// >> actions
// >> directives
// >> editors
// >> filters
// >> factories
import MbUserAtuthenticationProviderFactory from './factories/MbUserAtuthenticationProvider';
// >> services
// >> views

import Constants from './Constants';

mblowfish
	.addConstants(Constants)


	// >> actions
	// >> directives
	// >> editors
	// >> filters
	// >> factories
	.factory('MbUserAtuthenticationProvider', MbUserAtuthenticationProviderFactory)
	// >> services
	// >> views


	;