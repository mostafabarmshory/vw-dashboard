/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
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
import seen from '../../../seen'
/**
 * @ngdoc Factories
 * @name SeoEngine
 * @description Engine for SEO
 */
mblowfish.factory('SeoEngine', seen.factory({
	url: '/api/v2/seo/engines',
}));

/**
 * @ngdoc Factories
 * @name EngineProperty
 * @description Property of engine.
 */
mblowfish.factory('EngineProperty', seen.factory({
	url: '/api/v2/seo/engines/{engine_type}/properties'
}));

/**
 * @ngdoc Factories
 * @name SeoBackend
 * @description Defines a backend for SEO (rendring pages).
 */
mblowfish.factory('SeoBackend', seen.factory({
	url: '/api/v2/seo/backends'
}));

/**
 * @ngdoc Factories
 * @name SitemapLink
 * @description Defines a link to be added to sitemap
 */
mblowfish.factory('SitemapLink', seen.factory({
	url: '/api/v2/seo/links'
}));

/**
 * @ngdoc Factories
 * @name SeoContent
 * @description show the content of a seo link
 */
mblowfish.factory('SeoContent', seen.factory({
	url: '/api/v2/seo/contents',
	resources: [{
		name: 'Value',
		type: 'binary',
		url: '/content'
	}]
}));

/**
 * @ngdoc Services
 * @name $seo
 * @description SEO service
 * 
 * Provides some features to improve SEO.
 */
mblowfish.service('$seo', seen.service({
	resources: [{
		name: 'Engine',
		factory: 'SeoEngine',
		type: 'collection',
		url: '/api/v2/seo/engines'
	}, {
		name: 'Backend',
		factory: 'SeoBackend',
		type: 'collection',
		url: '/api/v2/seo/backends'
	}, {
		name: 'Link',
		factory: 'SitemapLink',
		type: 'collection',
		url: '/api/v2/seo/links'
	}, {
		name: 'Content',
		factory: 'SeoContent',
		type: 'collection',
		url: '/api/v2/seo/contents'
	}]
}));
