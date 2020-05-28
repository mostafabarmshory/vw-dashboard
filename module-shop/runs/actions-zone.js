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
.run(function(
        /* angularjs    */ $window,
        /* am-wb-core   */ $dispatcher,
        /* mblowfish    */ $navigator, $actions,
        /* sen-shop     */ $shop,
        /* ng-translate */ $translate) {
    // TODO: maso, 2020: add zone action

    var actions = [{
        id: 'create:/shop/zones',
        priority: 10,
        icon: 'photo_album',
        title: 'New Category',
        description: 'Creates new category',
        /*
         * @ngInject
         */
        action: function (/*$event*/) {
            var job = $shop.zoneSchema()
            .then(function(schema){
                return $navigator.openDialog({
                    templateUrl: 'views/dialogs/amd-item-new.html',
                    config: {
                        title: 'New Zone',
                        schema: schema,
                        data: {}
                    }
                });
            })
            .then(function (zoneData) {
                return $shop.putZone(zoneData);
            })
            .then(function (zone) {
                $dispatcher.dispatch('/shop/zones', {
                    key: 'create',
                    values: [zone]
                });
            }, function () {
                $window.alert($translate.instant('Failed to create new zone.'));
            });
            // TODO: maso, 2020: add the job into the job lists
            // $app.addJob('Adding new shop category', job);
            return job;
        },
        groups: ['amd.shop.zones']
    }];

    _.forEach(actions, function(action){
        $actions.newAction(action);
    });
});