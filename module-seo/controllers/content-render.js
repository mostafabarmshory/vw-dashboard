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
 * @ngdoc controller
 * @name AmdSeoContentRenderCtrl
 * @description Content render controller
 * 
 * Shows content preview and render the page
 */
.controller('AmdSeoContentRenderCtrl', function ($scope, $element, $state, $sce, $seoContent, $seo) {
    // controller attributes
    /*
     * loading, 404, 500
     */
    this.status = 'loading';
    this.seoContent = null;
    $scope.options = {
            removeAngularjsMDTags: true,
            removeAngularjsTags: true,
            removeStyle: true
    };
    $scope.editable = true;

    /**
     * Load SEO Content
     */
    this.loadSeoContent = function (contetnId) {
        var ctrl = this;
        $seo.getContent(contetnId)
        .then(function(content){
            ctrl.seoContent = content;
            // Load secure path
            ctrl.currentContenttUrl = $sce.trustAsResourceUrl(ctrl.seoContent.url);
        });
    };

    /**
     * Creates and upload the preview of the page
     */
    this.uploadPreview = function(options){
        var ctrl = this;
        $seoContent.optimize(this.getSeoContentHtml(), options)
        .then(function(optimizedHtml){
            return ctrl.seoContent.uploadValue(optimizedHtml);
        })//
        .then(function(newSeoContent){
            ctrl.seoContent = newSeoContent;
        });
    };

    this.getSeoContentHtml = function(){
        var iframe = $element.find('iframe')[0];

        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var html = new XMLSerializer().serializeToString(innerDoc);

        return html;
    };
    
    this.saveContent = function(){
        return this.seoContent.update();
    };

    // load controller
    if ($state.params.crawledLinkId) {
        this.loadSeoContent($state.params.crawledLinkId);
    } else {
        this.status = '404';
    }
});