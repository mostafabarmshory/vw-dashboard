/**

Required:

- values
- storePath
- deleteModel: a function to delete a model (if the model is not SeenModel)

 */
export default {
	demon: true,
	action: function($event, $mbDispatcherUtil, $q, $mbTranslate, $mbLog) {
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
				$mbLog.error(error);
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
				alert($mbTranslate.instant('Failt to delete some items'));
			}
		}

		function deleteModels() {
			/* 
			TODO: maso, 2020: support bulkey delete from server
			START: {
				seen.deleteModels(values)
					.then(function(){
						// success
					}, function(){
						// fail
					});
			*/
			_.forEach(values, deleteModel);

			/*}*/
			return $q.all(jobs)
				.finally(fireEvents);
		}

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return confirm(message)//
			.then(deleteModels);
	},
}

