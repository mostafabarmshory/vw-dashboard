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
import mblowfish from 'mblowfish';
import Constants from './Constants';

import assetsDetails from './actions/assets-details';
import assetsEdit from './actions/assets-edit';
import assetsNew from './actions/assets-new';
import categoryDetails from './actions/category-details';
import categoryEdit from './actions/category-edit';
import categoryNew from './actions/category-new';
import driveDetails from './actions/drive-details';
import driveEdit from './actions/drive-edit';
import driveNew from './actions/drive-new';
import tagDetails from './actions/tag-details';
import tagEdit from './actions/tag-edit';
import tagNew from './actions/tag-new';

import sdpDownloadedLinkDirective from './directives/sdpDownloadedLink';

import assetEditor from './editors/asset';
import categoryEditor from './editors/category';
import driveEditor from './editors/drive';
import tagEditor from './editors/tag';

import categoriesResource from './resources/categories';
import categoryResource from './resources/category';
import driversResource from './resources/drivers';
import tagsResource from './resources/tags';

import assetsView from './views/assets';
import categoriesView from './views/categories';
import downloadLinksView from './views/download-links';
import drivesView from './views/drives';
import linksView from './views/links';
import tagsView from './views/tags';

import assetCreateauthorPageWizardPage from './wizards/new-asset/authorPage';
import assetCreateebookPropertiesPageWizardPage from './wizards/new-asset/ebookPropertiesPage';
import assetCreatefilePageWizardPage from './wizards/new-asset/filePage';
import assetCreategenrePageWizardPage from './wizards/new-asset/genrePage';
import assetCreatemarketPageWizardPage from './wizards/new-asset/marketPage';
import assetCreatenotsupportPageWizardPage from './wizards/new-asset/notsupportPage';
import assetCreatpublisherPageeWizardPage from './wizards/new-asset/publisherPage';
import assetCreatetagsPageWizardPage from './wizards/new-asset/tagsPage';
import assetCreatetypePageWizardPage from './wizards/new-asset/typePage';
import assetCreateWizard from './wizards/new-asset/wizard';

import tagCreatePropertiesWizardPage from './wizards/new-tag/propertiesPage';
import tagCreateWizard from './wizards/new-tag/wizard';

import driveCreatepropertiesPageWizardPage from './wizards/new-drive/propertiesPage';
import driveCreatetypePageWizardPage from './wizards/new-drive/typePage';
import driveCreatetypePropertiesPageWizardPage from './wizards/new-drive/typePropertiesPage';
import driveCreateWizar from './wizards/new-drive/wizard';

import categoryCreatePropertiesWizardPage from './wizards/new-category/propertiesPage';
import categoryCreateWizard from './wizards/new-category/wizard';


mblowfish
	.addConstants(Constants)

	.action(Constants.SDP_ASSETS_DETAILS_ACTION, assetsDetails)
	.action(Constants.SDP_ASSETS_EDIT_ACTION, assetsEdit)
	.action(Constants.SDP_ASSETS_CREATE_ACTION, assetsNew)
	.action(Constants.SDP_CATEGORIES_DETAILS_ACTION, categoryDetails)
	.action(Constants.SDP_CATEGORIES_EDIT_ACTION, categoryEdit)
	.action(Constants.SDP_CATEGORIES_CREATE_ACTION, categoryNew)
	.action(Constants.SDP_DRIVES_DETAILS_ACTION, driveDetails)
	.action(Constants.SDP_DRIVES_EDIT_ACTION, driveEdit)
	.action(Constants.SDP_DRIVES_CREATE_ACTION, driveNew)
	.action(Constants.SDP_TAGS_DETAILS_ACTION, tagDetails)
	.action(Constants.SDP_TAGS_EDIT_ACTION, tagEdit)
	.action(Constants.SDP_TAGS_CREATE_ACTION, tagNew)

	.directive('sdpDownloadedLink', sdpDownloadedLinkDirective)

	.editor('/sdp/assets/:modelId', assetEditor)
	.editor('/sdp/categories/:modelId', categoryEditor)
	.editor('/sdp/storages/:modelId', driveEditor)
	.editor('/sdp/tags/:modelId', tagEditor)

	.resource('sdp-categories-list', categoriesResource)
	.resource('sdp-category-list', categoryResource)
	.resource('sdp-driver-list', driversResource)
	.resource('sdp-tag-list', tagsResource)

	.view('/sdp/assets', assetsView)
	.view(SDP_VIEW_CATEGORIES_PATH, categoriesView)
	.view('/sdp/downloads-link', downloadLinksView)
	.view(SDP_VIEW_DRIVES_PATH, drivesView)
	.view(SDP_VIEW_LINKS_PATH, linksView)
	.view('/sdp/tags', tagsView)

	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#author', assetCreateauthorPageWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#ebook-properties', assetCreateebookPropertiesPageWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#file', assetCreatefilePageWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#genre', assetCreategenrePageWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#market', assetCreatemarketPageWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#notsupport', assetCreatenotsupportPageWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#publisher', assetCreatpublisherPageeWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#tags', assetCreatetagsPageWizardPage)
	.wizardPage(SDP_ASSET_CREATE_WIZARD + '#type', assetCreatetypePageWizardPage)
	.wizard(SDP_ASSET_CREATE_WIZARD, assetCreateWizard)

	.wizardPage(SDP_CATEGORY_CREATE_WIZARD + '#properties', categoryCreatePropertiesWizardPage)
	.wizard(SDP_CATEGORY_CREATE_WIZARD, categoryCreateWizard)

	.wizardPage(SDP_DRIVE_CREATE_WIZARD + '#properties', driveCreatepropertiesPageWizardPage)
	.wizardPage(SDP_DRIVE_CREATE_WIZARD + '#type', driveCreatetypePageWizardPage)
	.wizardPage(SDP_DRIVE_CREATE_WIZARD + '#typeProperties', driveCreatetypePropertiesPageWizardPage)
	.wizard(SDP_DRIVE_CREATE_WIZARD, driveCreateWizar)

	.wizardPage(SDP_TAG_CREATE_WIZARD + '#properties', tagCreatePropertiesWizardPage)
	.wizard(SDP_TAG_CREATE_WIZARD, tagCreateWizard)

	// Integerate with environment
	.run(function($mbToolbar) {
		'ngInject';

		$mbToolbar
			.getToolbar(Constants.SDP_VIEW_CATEGORIES_PATH)
			.addAction(Constants.SDP_CATEGORIES_CREATE_ACTION);

		$mbToolbar
			.getToolbar(Constants.SDP_VIEW_TAGS_PATH)
			.addAction(Constants.SDP_TAGS_CREATE_ACTION);

		$mbToolbar
			.getToolbar(Constants.SDP_VIEW_DRIVES_PATH)
			.addAction(Constants.SDP_DRIVES_CREATE_ACTION);

		$mbToolbar
			.getToolbar(Constants.SDP_VIEW_ASSETS_PATH)
			.addAction(Constants.SDP_ASSETS_CREATE_ACTION);

	});




