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
	controllerAs: 'ctrl',
	templateUrl: 'scripts/module-cms/views/contents.html',
	groups: ['Content Management'],
	icon: 'image',
	controller: function($scope, $controller, $location, $mbActions, $amdCmsEditors) {
		'ngInject';
		// Extends with ItemsController
		angular.extend(this, $controller('MbSeenCmsContentsCtrl', {
			$scope: $scope
		}));
		/**
		Opne the content with an editor
		 */
		this.openEditor = function(content, $event) {
			$event.values = [content];
			return $mbActions.exec(AMD_CMS_CONTENTS_EDIT_ACTION, $event);
		};

		/**
		Opens content with the custome editor
		 */
		this.openWithSelectedEditor = function(content, editor, $event) {
			$event.editor = editor;
			return this.openEditor(content, $event);
		};

		this.openProperties = function(content) {
			return $mbActions.exec(AMD_CMS_CONTENTS_PROPERTIES_ACTION, {
				values: [content],
			});
		};
		this
			.addAction({
				title: 'New content',
				icon: 'add',
				action: function() {
					$location.path(AMD_CMS_VIEW_CONTENT_NEW_PATH);
				}
			})
			.addAction({
				title: 'New Page',
				icon: 'add',
				actionId: AMD_CMS_CONTENTS_NEWPAGE_ACTION
			});

		this.openMenu = function(content, $mdMenu, $event) {
			this.editors = $amdCmsEditors.getEditors(content.mime_type);
			return $mdMenu.open($event);
		};

		this.init();
	},
});
