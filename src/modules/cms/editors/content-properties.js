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

import $mbActions from 'mblowfish/src/services/mbActions';
import templateUrl from './content-properties.html';
import './content-properties.css';
import {
	AMD_CMS_CONTENT_SP,
	AMD_CMS_CONTENTS_READ_ACTION,
	AMD_CMS_CONTENTS_UPDATE_ACTION,
	AMD_CMS_CONTENTS_UPLOAD_ACTION,
	AMD_CMS_CONTENTS_DELETE_ACTION,
	AMD_CMS_CONTENTS_TOCLIPBOARD_ACTION,
} from '../Constants';
import MbSeenAbstractItemEditorCtrl from '../../core/controllers/MbSeenAbstractItemEditorCtrl';
import {
	removeItemFromCollection
} from '../../core/Utiles';



export class MbCmsContentPropertiesEditorCtrl extends MbSeenAbstractItemEditorCtrl {
	constructor($scope, $q, $editor, $state, $mbResource) {
		'ngInject';
		super($scope, $editor, $q);
		this.setStorePath(AMD_CMS_CONTENT_SP);
		this.$state = $state;
		this.$mbResource = $mbResource;
		this.reload();
	}


	// Load content
	reload($event) {
		return this.setJob(this.execOn(this.$state.params.contentId, AMD_CMS_CONTENTS_READ_ACTION, $event)
			.then(contents => {
				var content = contents[0];
				this.setModel(content);
				this.setTitle('Content:' + content.id);
				this.setDerty(false);
			}));
	}


	//-------------------------------------------------------------------------
	// functions: content
	//-------------------------------------------------------------------------
	deleteContent($event) {
		return this.execOn(this.model, AMD_CMS_CONTENTS_DELETE_ACTION, $event);
	}

	updateContent($event) {
		return this.execOn(this.model, AMD_CMS_CONTENTS_UPDATE_ACTION, $event);
	}

	uploadFile($event) {
		return this.execOn(this.model, AMD_CMS_CONTENTS_UPLOAD_ACTION, $event);
		//		ctrl.isCuntentBusy = $mbResource
		//			.get('file', {
		//				$style: {
		//					accept: '*/*'
		//				},
		//				targetEvent: $event
		//			})
		//			.then(function(file) {
		//				return content.uploadValue(file)
		//					.then(function(newContent) {
		//						ctrl.fireUpdated(AMD_CMS_CONTENT_SP, newContent);
		//					});
		//			})
		//			.finally(function() {
		//				delete ctrl.isCuntentBusy;
		//			});
		//		return ctrl.isCuntentBusy;
	}


	copyContentToClipboard() {
		return this.execOn(this.model, AMD_CMS_CONTENTS_TOCLIPBOARD_ACTION, $event);
		//			$clipboard.copyTo(this.content);
		// TODO: maso, 2019: add notify
	}


	//----------------------------------------------------------------------------
	// Meta fields
	//----------------------------------------------------------------------------
	removeMeta(meta) {
		this.model.metas = removeItemFromCollection(this.model.metas, meta);
		this.setDerty(true);
	}

	addMeta($key, $value) {
		$key = $key || 'key';
		var $meta = {
			id: -1000 * Math.random(),
			key: $key,
			value: $value,
		};
		this.model.metas.push($meta);
		this.setMetaDerty($meta);
	}

	setMetaDerty ($meta) {
		$meta.derty = true;
		this.setDerty(true);
	}

	setMetaValueByResource($meta, $type, $event) {
		$type = $type || guessResourceTypeFromName($meta.key);
		return this.$mbResource
			.get($type, {
				targetEvent: $event
			})//
			.then((data) => {
				$meta.value = data;
				this.setMetaDerty($meta);
			});
	}

	setMetaValue($key, $value) {
		var $meta;
		this.model.metas.forEach(meta => {
			if (meta.key === $key) {
				$meta = meta;
			}
		});
		if ($meta) {
			$meta.value = $value;
			this.setMetaDerty($meta);
			return;
		}
		return this.addMetafield($key, $value);
	}


	//---------------------------------------------------

	addTermTaxonomy($event) {
		return this.$mbResource
			.get(AMD_CMS_TERMTAXONOMIES_RT, {
				style: {
					title: 'Term taxonomy',
				},
				targetEvent: $event,
			})
			.then((termTaxonomies) => {
				termTaxonomies.forEach((tt) => {
					this.model.termTaxonomies.push(tt)
				});
				this.setDerty(true);
			});
	}

	removeTermTaxonomy(termTaxonomy) {
		this.model.termTaxonomies = removeItemFromCollection(this.model.termTaxonomies, termTaxonomy);
		this.setDerty(true);
	}

}

// TODO: move this function to $mbResource
export function guessResourceTypeFromName($name) {
	var $type;
	switch ($name) {
		case 'image':
		case 'favicon':
		case 'link.cover':
		case 'og:image':
			$type = 'image-url';
			break;
		case 'color':
			$type = 'color';
		default:
			$type = null;
	}
	return $type;
}



export default {
	templateUrl: templateUrl,
	controller: MbCmsContentPropertiesEditorCtrl,
};


