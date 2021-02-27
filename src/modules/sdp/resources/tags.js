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

mblowfish.resource('sdp-tag-list', {
	label: 'Tag list',
	templateUrl: 'scripts/module-sdp/resources/tags.html',
	tags: ['sdp-tag'],
	controllerAs: 'ctrl',
	controller: function($scope, $options, $resource, $sdp, $controller) {
		'ngInject';
		var ctrl = this;
		angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $scope
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.tagSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getTags(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getTag(id);
		};

		this.init({
			eventType: SDP_TAGS_SP,
		});
		
		//-------------------------------------------------------
		// Common in all resources
		//-------------------------------------------------------
		this.toggleResourceSelection = function(item) {
			this.setResourceSelected(item, !item.$selected);
		};

		this.setResourceSelected = function(item, selection) {
			if (!$options.multi) {
				this.clearSelection();
			}
			this.setSelected(item, selection);
			if ($options.object) {
				$resource.setValue(ctrl.getSelection());
			} else {
				var ids = [];
				_.forEach(ctrl.getSelection(), function(model) {
					ids.push(model.id);
				});
				$resource.setValue(ids);
			}
		};
	}
});