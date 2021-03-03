/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import './app.css';
import './app-preloader.css';
import './app-crisp-hack-button.css';

import $ from 'jquery';
import mblowfish from 'mblowfish';
import Constants from './Constants';
import AppConfig from './app-config';
import loadCrispProcess from './processes/load-crisp.js'
import loadTenantProcess from './processes/load-tenant';


/***********************************************************************************
 * Configuration
 **********************************************************************************/
mblowfish
	.addConstants(Constants)
	.config(AppConfig)
	
	
	// Application process
	// TODO: load usr message process
	// TODO: load news
	.applicationProcess('init', loadCrispProcess)
	.applicationProcess('init', loadTenantProcess);

	;

/***********************************************************************************
 * Modules
 **********************************************************************************/
import './modules/core';
import './modules/account';
//import './modules/backup';
//import './modules/bank';
import './modules/cms';
//import './modules/jms';
import './modules/sdp';
//import './modules/seo';
import './modules/shop';
//import './modules/shopx';
import './modules/tenant';
import './modules/user';

/***********************************************************************************
 * Custom application loading
 **********************************************************************************/
$(window).on('load', function() {
	mblowfish
		.loadModules(APP_KEY)
		.then(function() {
			try {
				mblowfish.bootstrap(document.documentElement, [
//					'vcRecaptcha', //https://github.com/VividCortex/angular-recaptcha
//					'ngFileSaver',//
				]);
			} catch (error) {
				console.log(error);
			}
		});
});




