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

import templateUrl from './contents.html';
import MbSeenAbstractCollectionViewCtrl from '../../core/controllers/MbSeenAbstractCollectionViewCtrl';
import $mbActions from 'mblowfish/src/services/mbActions';

export class MbCmsContentsCollectionViewCtrl extends MbSeenAbstractCollectionViewCtrl {

	constructor($view, $scope, $mbLog, MbAction, MbComponent, $cms, $q, $location, $amdCmsEditors) {
		'ngInject';
		super($view, $scope, $q, $mbLog, MbAction, MbComponent);
		this.$amdCmsEditors = $amdCmsEditors;
		this.$cms = $cms;

		$q
			.when(this.init({
				eventType: AMD_CMS_CONTENT_SP,
			}))
			.then(() => {
				$view.getToolbar()
					.addAction(new MbAction({
						title: 'New content',
						icon: 'add',
						action: function() {
							$location.path(AMD_CMS_VIEW_CONTENT_NEW_PATH);
						}
					}))
					.addAction(new MbAction({
						title: 'New Page',
						icon: 'note_add',
						actionId: AMD_CMS_CONTENTS_NEWPAGE_ACTION
					}));
			});
	}


	// Override the schema function
	getModelSchema = function() {
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
	Opne the content with an editor
	 */
	openEditor(content, $event) {
		$event.values = [content];
		return $mbActions.exec(AMD_CMS_CONTENTS_EDIT_ACTION, $event);
	}

	/**
	Opens content with the custome editor
	 */
	openWithSelectedEditor(content, editor, $event) {
		$event.editor = editor;
		return this.openEditor(content, $event);
	}

	openProperties(content) {
		return $mbActions.exec(AMD_CMS_CONTENTS_PROPERTIES_ACTION, {
			values: [content],
		});
	}

	openMenu(content, $mdMenu, $event) {
		this.editors = this.$amdCmsEditors.getEditors(content.mime_type);
		return $mdMenu.open($event);
	}

}
/**
@ngdoc Views
@name CMS Contents
@description A view of contents
 */
export default {
	access: 'hasAnyRole("tenant.owner")',
	title: 'Contents',
	templateUrl: templateUrl,
	groups: ['Content Management'],
	icon: 'image',
	controller: MbCmsContentsCollectionViewCtrl
}



