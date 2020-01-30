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
'use strict';

angular.module('ngMaterialDashboardCms')

/**
 * @ngdoc directive
 * @name wbInfinateScroll
 * @description # wbInfinateScroll
 */
.directive('amdContentPreview', function($q, $parse) {

	/**
	 * Link data and view
	 */
	function postLink(scope, attr, elem, ngModel) {
		
		function loadContent(content){
			if(scope.loadingModel ){
				return;
			}
			scope.loadingModel = true;
			return content.downloadValue()
			.then(function(model){
				scope.model = model;
			})
			.finally(function(){
				scope.loadingModel = false;
			});
		}
		/*
		 * Load types
		 */
		ngModel.$render = function(){
			scope.content = ngModel.$viewValue;
			if(!scope.content){
				scope.type = 'unknown';
				return;
			}
			if(angular.isArray(scope.content.mime_type.match(/.*(ogg|mp3|mpeg).*/i))){
				scope.type = 'audio';
			} else if(angular.isArray(scope.content.mime_type.match(/.*(video).*/i))){
				scope.type = 'video';
			} else if(angular.isArray(scope.content.mime_type.match(/.*(image).*/i))){
				scope.type = 'image';
			} else if(angular.isArray(scope.content.mime_type.match(/.*(weburger).*/i))){
				scope.type = 'weburger';
				loadContent(scope.content);
			} else {
				scope.type = 'unknown';
			}
		};
	}
	
	return {
		restrict : 'E',
		transclude : false,
		replace: true,
		require: 'ngModel',
		templateUrl : 'views/directives/amd-content-preview.html',
		link: postLink
	};
});
