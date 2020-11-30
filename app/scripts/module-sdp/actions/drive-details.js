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

mblowfish.addAction(SDP_DRIVES_DETAILS_ACTION, {
	icon: 'preview',
	title: 'Preview',
	description: 'Show details of a storage',
	groups: ['SDP'],
	action: function($rootScope, $rootElement, $event, $mbActions, $mbDialog) {
		'ngInject';
		var values = $event.values;
		if (!values || !_.isArray(values) || values.length < 1) {
			return;
		}

		return $mbDialog.show({
			templateUrl: 'scripts/module-sdp/actions/drive-details-dialog.html',
			locals: {
				$drive: values[0]
			},
			scope: $rootScope.$new(),
			parent: $rootElement,
			targetEvent: $event,
			clickOutsideToClose: true,
			openFrom: $event.target,
			closeTo: $event.target,
			preserveScope: false,
			hasBackdrop: true,
			escapeToClose: true,
			focusOnOpen: true,
			fullscreen: true,
			multiple: true,
			autoWrap: true,
			controllerAs: 'ctrl',
			/*@ngInject*/
			controller: function($scope, $mdDialog, $drive) {
				$scope.drive = $drive;
				$scope.close = function() {
					$mdDialog.hide();
				};
				$scope.exec = function(actionId, $event, close) {
					$event.values = [$drive];
					$mbActions.exec(actionId, $event);
					if (close) {
						$mdDialog.hide();
					}
				};
			}
		});
	},
});