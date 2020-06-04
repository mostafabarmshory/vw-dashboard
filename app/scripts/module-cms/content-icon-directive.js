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
@ngdoc directive
@name wbInfinateScroll
@description # wbInfinateScroll
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
			scope.content = ngModel.$viewValue;
			if(!scope.content){
				scope.type = 'insert_drive_file';
				return;
			}
			if(angular.isArray(scope.content.mime_type.match(/.*(ogg|mp3|mpeg).*/i))){
				scope.icon = 'audiotrack';
			} else if(angular.isArray(scope.content.mime_type.match(/.*(video).*/i))){
				scope.icon = 'video_library';
			} else if(angular.isArray(scope.content.mime_type.match(/.*(image).*/i))){
				scope.icon = 'image';
			} else if(angular.isArray(scope.content.mime_type.match(/.*(weburger).*/i))){
				scope.icon = 'chrome_reader_mode';
			} else {
				scope.icon = 'insert_drive_file';
			}
		};
	}
	
	return {
		restrict : 'E',
		transclude : false,
		replace: true,
		require: 'ngModel',
		template : '<ng-md-icon icon="{{icon}}"></ng-md-icon>',
		link: postLink
	};
});
