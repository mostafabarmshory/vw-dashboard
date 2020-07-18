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

mblowfish.controller('MbSeenCmsContentsCtrl', function($scope, $cms, $q, $controller) {

    /*
     * Extends collection controller
     */
	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	}));

	// Override the schema function
	this.getModelSchema = function() {
		return $cms.contentSchema();
	};

	// get contents
	this.getModels = function(parameterQuery) {
		return $cms.getContents(parameterQuery);
	};

	// get a content
	this.getModel = function(id) {
		return $cms.getContent(id);
	};

	// delete account
	this.deleteModel = function(content) {
		return $cms.deleteContent(content.id);
	};

    /**
     * Uploads a file on the server.
     * 
     * To upload the file there are two actions:
     * 
     * <ul>
     * <li>create a new content</li>
     * <li>upload content value</li>
     * </ul>
     * 
     * This function change the state of the controller into the
     * working.
     */
	this.uploadFile = function(content, file) {
        /*
         * upload file
         */
		function uploadContentValue(newContent) {
			if (file) {
				return newContent.uploadValue(file)//
					.then(function() {
						return newContent;
					});
			}
			return $q.resolve(newContent);
		}

		// XXX: maso, 2018: check content is not anonymous
		return $cms.putContent(content)//
			.then(uploadContentValue);
	};

	this.init({
		eventType: AMD_CMS_CONTENT_SP
	});
});