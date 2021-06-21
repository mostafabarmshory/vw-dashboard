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
import MbSeenAbstractItemEditorCtrl from '../../core/controllers/MbSeenAbstractItemEditorCtrl';
import Constants from '../Constants';
import './content-document-editor.css';

export class MbCmsContentDocumentEditor extends MbSeenAbstractItemEditorCtrl {

	constructor($state, $element, $editor, $scope, $q,
		$mbResource, $mbDispatcherUtil,
		$cms, $mbLocal, CmsContent) {
		'ngInject';
		super($scope, $editor, $q);

		this.$mbResource = $mbResource;
		this.$mbDispatcherUtil = $mbDispatcherUtil;
		this.$mbLocal = $mbLocal;

		this.iframe = $element.find('iframe');
		this.parent = window;
		this.child = this.iframe[0].contentWindow || iframe[0].contentDocument.parentWindow;

		//------------------------------------------------------------------
		// init
		//------------------------------------------------------------------\
		$cms
			.getContent($state.params.contentId, {
				graphql: '{id,media_type,mime_type,metas{id,key,value}}'
			})
			.then(contentData => {
				var content = new CmsContent(contentData);
				this
					.setTitle('Content:' + content.id)
					.setModel(content)
					.setStorePath(Constants.AMD_CMS_CONTENT_SP);
				this.iframe
					.attr('src', `/vw-document/?api=wp&version=1&language=${this.getLanguage()}`)
					.on('load', () => {
						ParentApi
							.connect(contentData, this.parent, this.child, '*')
							.then(parentApi => this.connectApi(parentApi))
					})
					.on('error', () => {
						// TODO: maso, 2021: fail to load inner web application
					});
			});
	}


	connectApi(parentApi) {
		this.api = parentApi;
		this.api
			.on('resource', (config) => this.getResource(config))
			.on('change', () => $editor.setDerty(true))
			.on('save', value => this.saveEditorContent(value))
			.on('delete', () => this.deleteModel());
		this.loadEditorDescription();
		this.loadEditorContent();
		// fire loaded
	}

	getResource(config) {
		this.$mbResource
			.get(config.type) // TODO: maso, 2021: set event target
			.then(value => this.api.call(config.call, value));
	}

	loadEditorDescription() {
		// inner editor
		var model = this.getModel();
		this.api.call('setTitle', model.title);
		this.api.call('setDescription', model.description);
	}

	loadEditorContent() {
		var model = this.getModel();
		model.downloadValue()
			.then(value => {
				this.api.call('setDerty', false);
				this.api.call('setValue', value);
				this.$editor.setDerty(false);
			})
	}

	saveEditorContent(value) {
		var model = this.getModel();
		model.uploadValue(value)
			.then(newContent => {
				this.$mbDispatcherUtil.fireUpdated(Constants.AMD_CMS_CONTENT_SP, {
					values: [newContent]
				});
				this.api.call('setDerty', false);
				this.$editor.setDerty(false);
			})
	}

	getLanguage() {
		var language = this.$mbLocal.getLanguage();
		var model = this.getModel();
		let metas = model.metas || [];
		metas.forEach(meta => {
			if (meta.key === 'language') {
				language = meta.value;
			}
		});
		return language;
	}
}








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
	controller: MbCmsContentDocumentEditor
}
// https://www.viraweb123.ir/vw-document/?url=/api/v2/cms/contents/13688/content