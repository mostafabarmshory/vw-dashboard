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

/**
 * @ngdoc Factories
 * @name CmsContent
 * @description A content model
 * 
 * Comment data model to manage and work with a comment in the system.
 * 
 * @attr {integer} id
 * @attr {string} name
 * @attr {string} mime_type
 * @attr {string} media_type
 */
mblowfish.factory('CmsContent', seen.factory({
	url: '/api/v2/cms/contents',
	resources: [{
		name: 'Value',
		type: 'binary',
		url: '/content'
	}, {
		name: 'TermTaxonomy',
		factory: 'CmsTermTaxonomy',
		type: 'collection',
		url: '/term-taxonomies'
	}, {
		name: 'Metadata',
		factory: 'CmsContentMetadata',
		type: 'collection',
		url: '/metas'
	}]
}));

/**
 * @ngdoc Factories
 * @name CmsTerm
 * @description The term model
 * 
 */
mblowfish.factory('CmsTerm', seen.factory({
	url: '/api/v2/cms/terms',
	resources: [{
		name: 'TermTaxonomy',
		factory: 'CmsTermTaxonomy',
		type: 'collection',
		url: '/term-taxonomies'
	}, {
		name: 'Metadata',
		factory: 'CmsTermMetadata',
		type: 'collection',
		url: '/metas'
	}]
}));

/**
 * @ngdoc Factories
 * @name CmsTermTaxonomy
 * @description The term-taxonomy model
 * 
 */
mblowfish.factory('CmsTermTaxonomy', seen.factory({
	url: '/api/v2/cms/term-taxonomies',
	resources: [{
		name: 'Content',
		factory: 'CmsContent',
		type: 'collection',
		url: '/contents'
	}]
}));

/**
 * @ngdoc Factories
 * @name CmsMetas
 * @description The metas model
 * 
 */
mblowfish.factory('CmsTermMetadata', seen.factory({
	url: '/api/v2/cms/terms/{{term_id}}/metas'
}));

/**
 * @ngdoc Factories
 * @name CmsContentMeta
 * @description The meta data model
 * 
 * Meta data is used to add to extra information (as key-value) to a content. It is
 * a sub model of a content and can not be used directly.
 */
mblowfish.factory('CmsContentMetadata', seen.factory({
	url: '/api/v2/cms/contents/{{content_id}}/metas'
}));


/*
 * Services
 */

/**
 * @ngdoc Services
 * @name $cms
 * @description Manages contents
 * 
 * مهم‌ترین سرویسی است که در این بسته ارائه شده و کار با محتوی و اطلاعات آن را
 * آسان می‌کند. این سرویس برای جستجو و یا گرفتن اطلاعات هر محتوایی از سیستم
 * کاربرد دارد. متحوی کاربرد زیادی توی صفحه‌های وب داره مثلا با استفاده از محتوی
 * می‌تونید صفحه اول سایت رو طراحی کنید و یا یک کلیپ آموزشی روی سایت بزارید.
 * 
 * برای هر محتوی می‌تونید یک نام در نظر بگیرد که در این صورت بهش می‌گیم محتوی
 * نام دارد. این نوع محتوی برای استفاده در سایت‌ها خیلی مناسب هست. برای نمونه در
 * یک صفحه می‌تونید مطالب رو به صورت زیر بگیرد و نمایش بدید:
 * 
 * @example
 * 
 * <pre><code>
 * $cms.namedContent('about-us')//
 * 		.then(function(nc) {
 * 			return nc.value();
 * 		}).then(function(cv) {
 * 			$scope.content = cv;
 * 		});
 * </code></pre>
 * 
 * البته ما اینجا فرض کردیم که محتوی موجود از نوع جیسون هست برای همین به صورت یک
 * موجودیت جاواسکریپتی باهاش برخورد کردیم.
 * 
 * @version 1.0 بر اساس قراردادهایی که در سین ۲ معرفی شده است ساختار این کلاس به
 *          روز شدا تا مدلهای جدید داده‌ای را ارائه کند. این ساختار به مراتب
 *          ساده‌تر از مدلی است که در نسخه‌های قبل ارائه شده است.
 */
mblowfish.service('$cms', seen.service({
	resources: [{
		name: 'Content',
		factory: 'CmsContent',
		type: 'collection',
		url: '/api/v2/cms/contents'
	}, {
		name: 'TermTaxonomy',
		factory: 'CmsTermTaxonomy',
		type: 'collection',
		url: '/api/v2/cms/term-taxonomies'
	}, {
		name: 'Term',
		factory: 'CmsTerm',
		type: 'collection',
		url: '/api/v2/cms/terms'
	}]
}));

