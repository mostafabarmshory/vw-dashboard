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
import MbSeenAbstractCollectionCtrl from '../../core/controllers/MbSeenAbstractCollectionCtrl';

export default class MbCmsContentsCtrl extends MbSeenAbstractCollectionCtrl {

	constructor($scope, $q, $mbLog, $cms) {
		'ngInject';
		super($scope, $q, $mbLog);
		this.$cms = $cms;
		this.init({
			eventType: AMD_CMS_CONTENT_SP
		});
	}


	// Override the schema function
	getModelSchema() {
		return this.$cms.contentSchema();
	}

	// get contents
	getModels(parameterQuery) {
		return this.$cms.getContents(parameterQuery);
	}

	// get a content
	getModel(id) {
		return this.$cms.getContent(id);
	}

	// delete account
	deleteModel(content) {
		return this.$cms.deleteContent(content.id);
	}

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
	uploadFile(content, file) {
		// XXX: maso, 2018: check content is not anonymous
		return this.$cms.putContent(content)//
			.then((newContent) => {
				if (file) {
					return newContent.uploadValue(file)//
						.then(() => newContent);
				}
				return this.$q.resolve(newContent);
			});
	}
}

