
export function createTerms($event, $mbDispatcherUtil, $mbWizard, $cms, $q) {
	'ngInject';

	var values = $event.values;
	if (!values || !_.isArray(values)) {
		return $mbWizard.openWizard(AMD_CMS_TERM_NEW_WIZARD);
	}

	var jobs = [],
		terms = [];
	_.forEach(values, function(term) {
		var promise = $cms.putTerm(term)
			.then(function(newTerm) {
				terms.push(newTerm);
			});
		jobs.push(promise);
	});

	return $q.all(jobs)
		.then(function() {
			$mbDispatcherUtil.fireCreated(AMD_CMS_TERMS_SP, terms);
		});
}


export function deleteTerms($event, $mbDispatcherUtil, $q, $mbTranslate, $cms) {
	'ngInject';

	var values = $event.values;
	if (!values || !_.isArray(values)) {
		return $q.reject('No term specified.');
	}

	var message;
	if (values.length === 1) {
		message = $mbTranslate.instant('Delete item (Undo is not support)?');
	} else {
		message = $mbTranslate.instant('Delete items (Undo is not support)?');
	}

	// TODO: maso, 2020: add the job into the job lists
	// $app.addJob('Adding new shop category', job);
	return confirm(message)//
		.then(function() {
			/* 
			TODO: maso, 2020: support bulkey delete from server
			START: {
			*/
			var jobs = [];
			_.forEach(values, function(value) {
				jobs.push($cms.deleteTerm(value.id));
			});
			/*}*/
			return $q.all(jobs)
				.then(function() {
					$mbDispatcherUtil.fireDeleted(AMD_CMS_TERMS_SP, values);
				});
		});
}






