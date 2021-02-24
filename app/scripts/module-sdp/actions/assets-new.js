mblowfish.addAction(SDP_ASSETS_CREATE_ACTION, {
	icon: 'add',
	title: 'SDP: New Asset',
	description: 'Create an assets',
	group: 'SDP',
	action: function($event, $sdp, $q, $mbActions, $mbDispatcherUtil, $mbWizard) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(SDP_ASSET_CREATE_WIZARD);
		}
		
		function setMetadata(asset, metadate){
			var jobs = [];
			_.forEach(metadate, function(metadatum){
				jobs.push(asset.putMetadatum(metadatum));
			});
			return jobs;
		}
		
		function setTags(asset, tags){
			var jobs = [];
			_.forEach(tags, function(tag){
				tag.tagId = tag.id;
				jobs.push(asset.putTag(tag));
			});
			return jobs;
		}
		
		function setCategories(asset, categories){
			var jobs = [];
			_.forEach(categories, function(category){
				category.categoryId = category.id;
				jobs.push(asset.putCategory(category));
			});
			return jobs;
		}

		var jobs = [],
			models = [];
		_.forEach(values, function(value) {
			var metadata = value.metadata;
			var tags = value.tags;
			var categories = value.categories;
			delete value.metadata;
			delete value.tags;
			delete value.categories;
			jobs.push($sdp
				.putAsset(value)
				.then(function(model) {
					models.push(model);
					return $q.all(_.concat(
						setMetadata(model, metadata),
						setTags(model, tags),
						setCategories(model, categories)));
				}));
		});

		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(SDP_DRIVES_SP, models);
				return $mbActions.exec(SDP_ASSETS_EDIT_ACTION, {
					values: models
				});
			});
	},
});