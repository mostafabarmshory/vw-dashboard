
import mblowfish from 'mblowfish';
import seen from '../../../seen'

mblowfish.factory('BackupSnapshot', seen.factory({
	url: '/api/v2/backup/snapshots',
	resources: []
}));

mblowfish.service('$backup', seen.service({
	resources: [{
		name: 'Snapshot',
		factory: 'BackupSnapshot',
		type: 'collection',
		url: '/api/v2/backup/snapshots'
	}]
}));
