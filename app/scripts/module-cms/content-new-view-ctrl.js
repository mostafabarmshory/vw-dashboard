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
@ngdoc controller
@name AmdContentNewCtrl
@description Mange content new
 */
mblowfish.controller('AmdContentNewCtrl', function($scope, $cms, $location, $mbCrypto) {

	var ctrl = {
		savingContent: false
	};

	function cancel() {
		$location.path('/cms/contents');
	}

	function add(config) {
		ctrl.savingContent = true;
		var data = config.model;
		if (typeof data.title === 'undefined') {
			data.title = data.name;
		}
		var promise = $cms.putContent(data);
		if (config.files[0]) {
			promise = promise.then(function(content) {
				var file = config.files[0].lfFile;
				return content.uploadValue(file);
			});
		}
		promise
			.then(function(obj) {
				$location.path('/cms/contents/' + obj.id);
			}, function(error) {
				alert('Fail to create content:' + error.data.message);
			})
			.finally(function() {
				ctrl.savingContent = false;
			});
	}


	/**
	 * Sets page name with random value
	 * 
	 * @memberof AmdContentNewCtrl
	 */
	this.generateRandomName = function() {
		$scope.config.model.name = $mbCrypto.uuid();
	};

	this.cancel = cancel;
	this.add = add;
	$scope.config = {};
	$scope.config.model = {
		name: $mbCrypto.uuid()
	};
});
