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
'use strict';
angular.module('ngMaterialDashboardSeo')

/**
 * @ngdoc Services
 * @name $mbActions
 * @description Manage application actions
 * 
 * Controllers and views can access actions which is registered by an
 * applications. This service is responsible to manage global actions.
 * 
 */
.service('$seoContent', function($q) {

    /**
     * Remove extra informations and optimized the page
     * 
     * options:
     * 
     * removeStyle:
     * 
     * removeAngularjsTags:
     * 
     * removeAngularjsMDTags:
     * 
     */
    this.optimize = function(htmlText, options) {
        var content = htmlText;
        // TODO: maso, 2019: check options

        if(options.removeStyle){
            content = this.removeStyle(content);
        }
        if(options.removeAngularjsTags){
            content = this.removeAngularJSTags(content);
        }
        if(options.removeAngularjsMDTags){
            content = this.removeAngularJSMaterialTags(content);
        }
        content = this.removeAngularJSMBTags(content);
        return $q.resolve(content);
    };

    this.removePatterns = function(content, patterns) {
        var matches = null;
        for(let j = 0; j < patterns.length; j++){
            matches = content.match(patterns[j]);
            for (let i = 0; matches && i < matches.length; i++) {
                content = content.replace(matches[i], '');
            }
        }
        return content;
    };

    this.removeStyle = function(htmlText) {
        var patterns = [
            /<style(?:.*?)>(?:[\S\s]*?)<\/style>/gim,

            / class=\"(?:[^\"]*?)\"/gi,
            / style=\"(?:[^\"]*?)\"/gim,
            / draggable=\"(?:[^\"]*?)\"/gim,
            / color=\"(?:[^\"]*?)\"/gim,
            / tabindex=\"(?:[^\"]*?)\"/gim,
            / width=\"(?:[^\"]*?)\"/gim,
            / height=\"(?:[^\"]*?)\"/gim,
            / size=\"(?:[^\"]*?)\"/gim,
            / align=\"(?:[^\"]*?)\"/gim,
            ];
        return this.removePatterns(htmlText, patterns);
    };

    this.removeAngularJSTags = function(htmlText){
        var patterns = [
            // move angular
            /(\s)+ng-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-ng-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+transclude=\"(?:[^\"]*)\"/gim,
            /<!--(\s)*ng(?:\w+)\:((?!-->).)*-->/gi,
            /<!--(\s)*end ng(?:\w+)\:((?!-->).)*-->/gi,
            ];
        return this.removePatterns(htmlText, patterns);
    };

    this.removeAngularJSMaterialTags = function(htmlText){
        var patterns = [
            // move angular-material design
            /(\s)+md-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-md-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+layout=\"(?:[^\"]*)\"/gim,
            /(\s)+layout-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+flex=\"(?:[^\"]*)\"/gim,
            /(\s)+flex-(?:[^=]+)=\"(?:[^\"]*)\"/gim,

            // TODO: maso: may application
            /(\s)+wb-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-wb-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+translate=\"(?:[^\"]*)\"/gim,

            /(\s)+dnd-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-dnd-(?:[^=]+)=\"(?:[^\"]*)\"/gim,

            /(\s)+ui-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-ui-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            ];

        return this.removePatterns(htmlText, patterns);
    };

    this.removeAngularJSMBTags = function(htmlText){
        var patterns = [
            // TODO: maso: may application
            /(\s)+wb-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-wb-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+translate=\"(?:[^\"]*)\"/gim,

            /(\s)+dnd-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-dnd-(?:[^=]+)=\"(?:[^\"]*)\"/gim,

            /(\s)+ui-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            /(\s)+data-ui-(?:[^=]+)=\"(?:[^\"]*)\"/gim,
            ];

        return this.removePatterns(htmlText, patterns);
    };

    return this;
});