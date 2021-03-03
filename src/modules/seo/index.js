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
import contentRenderAction from './actions/contents-render';

import backendEditor from './editors/backend';
import renderEditor from './editors/render-linke';
import sitemapEditor from './editors/sitemap-link';

import seoContent from './services/seo-content-service';

import backendsView from './views/backends';
import backendsNewView from './views/backends-new';
import crawledLinksView from './views/crawled-links';
import linksView from './views/links';
import linksNewView from './views/links-new';

mblowfish
	.constant(Constants)


	.action(Constants.AMD_SEO_CONTENTS_RENDER_ACTION, contentRenderAction)

	.editor('/seo/backends/:id', backendEditor)
	.editor('/seo/crawled-links/:crawledLinkId/render', renderEditor)
	.editor('/seo/links/:itemId', sitemapEditor)

	.service('$seoContent', seoContent)

	.view('/seo/backends', backendsView)
	.view('/seo/backends-new', backendsNewView)
	.view('/seo/crawled-links', crawledLinksView)
	.view('/seo/links', linksView)
	.view('/seo/links-new', linksNewView)
	;



