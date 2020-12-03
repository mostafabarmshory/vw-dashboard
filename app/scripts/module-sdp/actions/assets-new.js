/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

mblowfish.addAction(SDP_ASSETS_CREATE_ACTION, {
	icon: 'add',
	title: 'New',
	description: 'Create assets',
	groups: ['SDP'],
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