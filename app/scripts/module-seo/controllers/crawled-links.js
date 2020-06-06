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

/**
 * @ngdoc controller
 * @name AmdSeoCrawledLinksCtrl
 * @description # Controller of the crawled links
 */
mblowfish.controller('AmdSeoCrawledLinksCtrl', function ($scope, $navigator, $mbTranslate, $seo, $controller) {

    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope: $scope
    }));

    /*
     * Override the function
     */
    this.getModelSchema = function () {
        return $seo.contentSchema();
    };

    // get crawled links
    this.getModels = function (parameterQuery) {
        return $seo.getContents(parameterQuery);
    };

    // get a crawled link
    this.getModel = function (id) {
        return $seo.getContent(id);
    };

    // delete crawled link
    this.deleteModel = function (item) {
        return item.delete();
    };

    this.init({
        eventType: '/seo/crawled-links'
    });

    /**
     * Upload content to pbobject
     * 
     * @param pobject
     */
    this.upload = function (pobject) {
        $navigator.openDialog({
            templateUrl: 'views/dialogs/select-file.html',
            config: {
                _files: []
            }
        })//
        .then(function (config) {
            return pobject.uploadValue(config.files[0].lfFile);//
        }, function () {})
        .then(function (content) {
            //TODO: Masood, 2019: Do works if needed
        }, function () {
            alert($mbTranslate.instant('Failed to upload content'));
        });
    };
});
