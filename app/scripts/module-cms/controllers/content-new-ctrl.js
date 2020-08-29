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
mblowfish.controller('AmdContentNewCtrl', function(
	$scope,/* $frame,*/
	$cms,
	$mbActions, $controller,
	$mbCrypto) {
	'ngInject';


    /*
     * Extends collection controller
     */
	angular.extend(this, $controller('MbAbstractCtrl', {
		$scope: $scope
	}));
	var ctrl = this;

	function cancel() {
		reload();
		//		return $frame.close();
	}

	function add(config) {
		ctrl.savingContent = true;
		var data = config.model;
		if (_.isUndefined(data.title)) {
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
			.then(function(content) {
				ctrl.fireCreated(AMD_CMS_CONTENT_SP, content);
				reload();
				return $mbActions.exec(AMD_CMS_CONTENTS_EDIT_ACTION, {
					values: [content]
				});
			}, function(/*error*/) {
				// TODO: maso, 2020: log the error
				alert('Fail to create content.');
			})
			.finally(function() {
				delete ctrl.savingContent;
			});
	}


	/**
	 * Sets page name with random value
	 * 
	 * @memberof AmdContentNewCtrl
	 */
	function generateRandomName() {
		$scope.config.model.name = $mbCrypto.uuid();
	}

	function reload() {
		$scope.config = {
			model: {},
			files: []
		};
		generateRandomName();
	}

	_.assign(ctrl, {
		savingContent: false,

		cancel: cancel,
		add: add,
		generateRandomName: generateRandomName,
	});

	reload();
});
