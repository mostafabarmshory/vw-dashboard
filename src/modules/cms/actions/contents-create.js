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

export default {
	icon: 'new',
	title: 'New Content',
	description: 'Creates a new content',
	group: 'CMS',
	action: function($event, $cms, $q, $mbDispatcherUtil, $mbActions) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return;
		}
		var jobs = [],
			contents = [];
		_.forEach(values, function(value) {
			var content = value.content || value.file;
			var metadata = value.metadata;
			delete value.content;
			delete value.file;
			delete value.metadata;
			// TODO: support termtaxonomy
			var promise = $cms.putContent(value);
			if (content) {
				promise = promise.then(function(newContent) {
					contents.push(newContent);
					var newJobs = [];
					newJobs.push(newContent.uploadValue(content));
					if (metadata) {
						_.forEach(metadata, function(item) {
							newJobs.push(newContent.putMetadatum(item));
						});
					}
					return $q.all(newJobs)
						.finally(function() {
							return newContent;
						});
				});
			} else {
				promise
					.then(function(newContent) {
						contents.push(newContent);
					});
			}
			jobs.push(promise);
		});


		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(AMD_CMS_CONTENT_SP, contents);
				return $mbActions.exec(AMD_CMS_CONTENTS_EDIT_ACTION, {
					values: contents
				});
			});
	},
}

