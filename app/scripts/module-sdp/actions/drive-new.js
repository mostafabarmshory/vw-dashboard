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

mblowfish.addAction(SDP_DRIVES_CREATE_ACTION, {
	icon: 'add',
	title: 'New Storage',
	description: 'Creates a new storage of assets',
	groups: ['SDP'],
	action: function($event, $sdp, $mbWizard, $q, $mbDispatcherUtil, $mbActions) {
		'ngInject';
		var values = [];
		if ($event) {
			values = $event.values;
		}
		if (!values || !_.isArray(values)) {
			return $mbWizard.openWizard(SDP_DRIVE_CREATE_WIZARD);
		}
		var jobs = [],
			models = [];
		_.forEach(values, function(value) {
			var promise = $sdp
				.putDrive(value)
				.then(function(model) {
					models.push(model);
				});
			jobs.push(promise);
		});


		return $q.all(jobs)
			.then(function() {
				$mbDispatcherUtil.fireCreated(SDP_DRIVES_SP, models);
				return $mbActions.exec(SDP_DRIVES_EDIT_ACTION, {
					values: models
				});
			});
	},
});