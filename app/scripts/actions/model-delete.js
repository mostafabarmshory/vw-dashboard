
/**

Required:

- values
- storePath
- deleteModel: a function to delete a model (if the model is not SeenModel)

 */
mblowfish.addAction(SEEN_MODEL_DELETE_ACTION, {
	icon: 'delete',
	title: 'Delete Models',
	description: 'Delete list of models',
	groups: ['seen'],
	action: function($event, $mbDispatcherUtil, $q, $mbTranslate) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return $q.reject('No item specified.');
		}

		var message;
		if (values.length === 1) {
			message = $mbTranslate.instant('Delete item (Undo is not support)?');
		} else {
			message = $mbTranslate.instant('Delete items (Undo is not support)?');
		}

		var jobs = [],
			successModel = [],
			faildModel = [];

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return confirm(message)//
			.then(deleteModels);

		function deleteModel(value) {
			var promise;
			if (_.isFunction($event.deleteModel)) {
				promise = $event.deleteModel(value);
			} else {
				promise = value.delete();
			}
			promise.then(function() {
				successModel.push(value);
			}, function(error) {
				faildModel.push(value);
				$mbLob.eroor(error);
			});
			jobs.push(promise);
		}

		function fireEvents() {
			// 2- fire
			if ($event.storePath && successModel.length) {
				$mbDispatcherUtil.fireDeleted($event.storePath, successModel);
			}
			// show error
			if (faildModel.length) {
				alert($mbTranslate('Failt to delete some items'));
			}
		}

		function deleteModels() {
			/* 
			TODO: maso, 2020: support bulkey delete from server
			START: {
			*/
			_.forEach(values, deleteModel);

			/*}*/
			return $q.all(jobs)
				.then(fireEvents);
		}
	},
});