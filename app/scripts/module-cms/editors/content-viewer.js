///* 
// * The MIT License (MIT)
// * 
// * Copyright (c) 2016 weburger
// * 
// * Permission is hereby granted, free of charge, to any person obtaining a copy
// * of this software and associated documentation files (the "Software"), to deal
// * in the Software without restriction, including without limitation the rights
// * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// * copies of the Software, and to permit persons to whom the Software is
// * furnished to do so, subject to the following conditions:
// * 
// * The above copyright notice and this permission notice shall be included in all
// * copies or substantial portions of the Software.
// * 
// * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// * SOFTWARE.
// */
//
//mblowfish.addEditor('/cms/content-viewer/:contentId', {
//	title: 'Content Viewer',
//	icon: 'face',
//	template: '<div></div>',
//	controllerAs: 'ctrl',
//	supportedMimetypes: ['*/*'],
//	controller: function($state, $element, $cms) {
//		'ngInject';
//		//------------------------------------------------------------------
//		// Functions
//		//------------------------------------------------------------------\
//		function loadObject() {
//			$element.empty();
//			$cms.getContent($state.params.contentId)
//				.then(function(content) {
//					$element.append(mblowfish.element('<embed></embed>')
//						.attr('src', 'api/v2/cms/contents/' + content.id + '/content')
//						.attr('type', content.mime_type)
//						.css({
//							'flex-grow': 1
//						}));
//				});
//		}
//
//		//------------------------------------------------------------------
//		// init
//		//------------------------------------------------------------------
//		loadObject();
//	},
//});
//
//
//
//
//
//
//
//
