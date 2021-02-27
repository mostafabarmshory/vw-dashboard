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


/**
@ngdoc Directive
@name amd-content-icon
@description 

Display an icon for the current content
 */
mblowfish.directive('amdContentIcon', function() {

	/**
	 * Link data and view
	 */
	function postLink(scope, attr, elem, ngModel) {
		/*
		 * Load types
		 */
		ngModel.$render = function(){
			var content = ngModel.$viewValue;
			var icon = 'insert_drive_file';
			if(!content){
				scope.icon = icon;
				return;
			}
			var mime_type = content.mime_type;
			if(angular.isArray(mime_type.match(/.*(ogg|mp3|mpeg).*/i))){
				icon = 'audiotrack';
			} else if(angular.isArray(mime_type.match(/.*(video).*/i))){
				icon = 'video_library';
			} else if(angular.isArray(mime_type.match(/.*(image).*/i))){
				icon = 'image';
			} else if(angular.isArray(mime_type.match(/.*(weburger).*/i))){
				icon = 'chrome_reader_mode';
			} else {
				icon = 'insert_drive_file';
			}
			scope.icon = icon;
		};
	}
	
	return {
		restrict : 'E',
		transclude : false,
		replace: true,
		require: 'ngModel',
		template : '<mb-icon>{{::icon}}</mb-icon>',
		link: postLink
	};
});
