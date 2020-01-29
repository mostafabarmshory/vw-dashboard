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
angular.module('ngMaterialDashboardShop')
.run(function($navigator, $actions, $shop, $dispatcher) {
    var groupId = '/shop/products';

    var actions = [{// create new category menu
        id: 'create:'+ groupId,
        priority: 10,
        icon: 'photo_album',
        title: 'New Product',
        description: 'Creates new product for shop',
        /*
         * @ngInject
         */
        action: function (/*$event*/) {
            var job = $shop.productSchema()
            .then(function(schema){
                return $navigator.openDialog({
                    templateUrl: 'views/dialogs/amd-item-new.html',
                    config: {
                        title: 'New Product',
                        schema: schema,
                        data: {}
                    }
                });
            })
            .then(function (productData) {
                return $shop.putProduct(productData);
            })
            .then(function (product) {
                $dispatcher.dispatch(groupId, {
                    key: 'create',
                    values: [product]
                });
            }, function () {
                $window.alert($translate.instant('Failed to create a new product.'));
            });
            // TODO: maso, 2020: add the job into the job lists
            // $app.addJob('Adding new shop category', job);
            return job;
        },
        groups: [groupId]
    }];

    _.forEach(actions, function(action){
        $actions.newAction(action);
    });
});