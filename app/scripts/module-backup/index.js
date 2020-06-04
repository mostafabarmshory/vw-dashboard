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

mblowfish
	.factory('BackupSnapshot', seen.factory({
		url: '/api/v2/backup/snapshots',
		resources: []
	}))
	.service('$backup', seen.service({
		resources: [{
			name: 'Snapshot',
			factory: 'BackupSnapshot',
			type: 'collection',
			url: '/api/v2/backup/snapshots'
		}]
	}));


mblowfish.config(function($mbActionsProvider,$mbViewProvider) {
	var EVENT_NAME = '/backup/snapshots';

	$mbActionsProvider
		.addAction('create:/backup/snapshots', {
			title: 'New Backup Snapshot',
			description: 'Creates new backup snapshot in the current tenant',
			icon: 'store',
			/* @ngInject */
			action: function($backup, $navigator, $window, $mbDispatcher, $translate) {
				var job = $backup.snapshotSchema()
					.then(function(schema) {
						return $navigator.openDialog({
							templateUrl: 'views/dialogs/amd-item-new.html',
							config: {
								title: 'New Backup Snapshot',
								schema: schema,
								data: {}
							}
						});
					})
					.then(function(itemData) {
						return $backup.putSnapshot(itemData);
					})
					.then(function(item) {
						$mbDispatcher.dispatch(EVENT_NAME, {
							key: 'create',
							values: [item]
						});
					}, function() {
						$window.alert($translate.instant('Failed to create a new backup snapshot.'));
					});
				// TODO: maso, 2020: add the job into the job lists
				// $app.addJob('Adding new shop category', job);
				return job;
			}
		});



	$mbViewProvider
		.addView('/backup/snapshots', {
			title: 'Backup Snapshots',
			icon: 'business',
			templateUrl: 'views/backup/snapshots.html',
			groups: ['Tenant'],
		});

});

