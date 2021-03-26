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
import ParentApi from 'mblowfish/src/wp/ParentApi';
import './content-document-editor.css';
import Constants from '../Constants';
/*

@see https://github.com/mozilla/pdf.js/wiki/Viewer-options
*/
export default {
	title: 'Document Editor',
	icon: 'text',
	template: '<iframe class="mb-cms-content-document-editor"></iframe>',
	controllerAs: 'ctrl',
	supportedMimetypes: [
		'text/html',
		'application/weburger+json'
	],
	controller: function(
		$state, $element, $editor, $scope,
		$mbResource, $mbDispatcherUtil,
		$cms, $mbLocal, $controller, CmsContent) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractItemEditorCtrl', {
			$scope: $scope,
			$element: $element,
			$editor: $editor
		}));


		let api;
		let content;
		let iframe = $element.find('iframe');
		let parent = window;
		let child = iframe[0].contentWindow || iframe[0].contentDocument.parentWindow;

		function connectApi(parentApi) {
			api = parentApi;
			api
				.on('resource', (config) => getResource(config))
				.on('change', () => $editor.setDerty(true))
				.on('save', value => saveEditorContent(value))
				.on('delete', () => this.deleteModel());
			loadEditorDescription();
			loadEditorContent();
			// fire loaded
		}

		function getResource(config) {
			$mbResource
				.get(config.type) // TODO: maso, 2021: set event target
				.then(value => api.call(config.call, value));
		}

		function loadEditorDescription() {
			// inner editor
			api.call('setTitle', content.title);
			api.call('setDescription', content.description);
		}

		function loadEditorContent() {
			content.downloadValue()
				.then(value => {
					api.call('setDerty', false);
					api.call('setValue', value);

					$editor.setDerty(false);
				})
		}

		function saveEditorContent(value) {
			content.uploadValue(value)
				.then(newContent => {
					$mbDispatcherUtil.fireUpdated(Constants.AMD_CMS_CONTENT_SP, {
						values: [newContent]
					});
					api.call('setDerty', false);
					$editor.setDerty(false);
				})
		}

		function getLanguage() {
			var language = $mbLocal.getLanguage();
			let metas = content.metas || [];
			metas.forEach(meta => {
				if (meta.key === 'language') {
					language = meta.value;
				}
			});
			return language;
		}

		//------------------------------------------------------------------
		// init
		//------------------------------------------------------------------\
		$cms
			.getContent($state.params.contentId, {
				graphql: '{id,media_type,mime_type,metas{id,key,value}}'
			})
			.then(contentData => {
				content = new CmsContent(contentData);
				this
					.setTitle('Content:' + content.id)
					.setModel(content)
					.setStorePath(Constants.AMD_CMS_CONTENT_SP);
				iframe
					.attr('src', `/vw-document/?api=wp&version=1&language=${getLanguage()}`)
					.on('load', () => {
						ParentApi
							.connect(contentData, parent, child, '*')
							.then(parentApi => connectApi(parentApi))
					})
					.on('error', () => {
						// TODO: maso, 2021: fail to load inner web application
					});
			});
	}
}









// https://www.viraweb123.ir/vw-document/?url=/api/v2/cms/contents/13688/content