/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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


/**
@ngdoc Views
@name CMS Contents
@description A view of contents
 */
mblowfish.addView(AMD_CMS_VIEW_CONTENTS_PATH, {
	title: 'Contents',
	controller: function($scope, $controller, $location, $amdCmsEditors) {
		'ngInject';
		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenCmsContentsCtrl', {
			$scope: $scope
		}));
		this.openEditor = function(content) {
			return $amdCmsEditors.openContent(content);
		};
		this.addAction({
			title: 'New content',
			icon: 'add',
			action: function() {
				$location.path(AMD_CMS_VIEW_CONTENT_NEW_PATH);
			}
		});
		this.init();
	},
	controllerAs: 'ctrl',
	templateUrl: 'views/amd-contents.html',
	groups: ['Content Management'],
	icon: 'image',
});
