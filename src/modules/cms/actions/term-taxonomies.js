
export function createTermTaxonomies($event, $mbDispatcherUtil, $mbWizard, $cms, $q) {
	'ngInject';

	var values = $event.values;
	if (!values || !_.isArray(values)) {
		return $mbWizard.openWizard(AMD_CMS_TERMTAXONOMY_NEW_WIZARD);
	}

	var jobs = [],
		tts = [];
	_.forEach(values, function(tt) {
		var promise = $cms.putTermTaxonomy(tt)
			.then(function(newtt) {
				tts.push(newtt);
			});
		jobs.push(promise);
	});

	return $q.all(jobs)
		.then(function() {
			$mbDispatcherUtil.fireCreated(AMD_CMS_TERMTAXONOMIES_SP, tts);
		});
}

export function deleteTermTaxonomies($event, $mbDispatcherUtil, $q, $mbTranslate, $cms) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return $q.reject('No term-taxonomies specified.');
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
					jobs.push($cms.deleteTermTaxonomy(value.id));
				});
				/*}*/
				return $q.all(jobs)
					.then(function() {
						$mbDispatcherUtil.fireDeleted(AMD_CMS_TERMTAXONOMIES_SP, values);
					});
			});
	}





