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

/**
 * @ngdoc Controller
 * @name AmdShopProductCtrl
 * @description Controller of products list
 */
mblowfish.controller('AmdShopProductCtrl', function ($scope, $shop, $state, $translate, $navigator, $location, $q, QueryParameter ) {

    var ctrl = {
            loading: false,
            updating: false,
            edit: false,
            loadingMetas: false,
            loadingCategories: false
    };

    /**
     * @name loadProduct
     * @memberOf AmdShopProductCtrl
     * @description Load the selected product
     */
    function loadProduct() {
        if (ctrl.loading) {
            return;
        }
        ctrl.loading = true;
        $shop.getProduct($state.params.productId)//
        .then(function (p) {
            $scope.product = p;
            loadMetas();
            loadCategories();
        }, function () {
            alert($translate.instant('Faild to load the product.'));
        })//
        .finally(function () {
            ctrl.loading = false;
        });
    }

    /**
     * @name remove
     * @memberOf AmdShopProductCtrl
     * @description Remove the selected product from the server
     */
    function remove() {
        confirm($translate.instant('Item will be deleted. There is no undo action.'))//
        .then(function () {
            return $scope.product.delete()//
            .then(function () {
                $location.path('/products');
            }, function () {
                alert($translate.instant('Fail to delete the product.'));
            });
        });
    }

    /**
     * @name update
     * @memberOf AmdShopProductCtrl
     * @description Update the selected product
     */
    function update() {
        if (ctrl.updating) {
            return;
        }
        ctrl.updating = true;
        $scope.product.update()//
        .then(function (newProduct) {
            $scope.product = newProduct;
            ctrl.edit = false;
        }, function () {
            alert($translate.instant('Failed to update product.'));
        })//
        .finally(function () {
            ctrl.updating = false;
        });
    }

    /**
     * @name loadMetas
     * @memberOf AmdShopProductCtrl
     * @description Load the metadatas of the product
     */
    function loadMetas() {
        if (ctrl.loadingMetas) {
            return;
        }
        ctrl.loadingMetas = true;
        $scope.product.getMetafields()
        .then(function (metaFields) {
            $scope.metafeilds = metaFields.items;
        }, function () {
            alert($translate.instant('Faild to get metafields.'));
        })//
        .finally(function () {
            ctrl.loadingMetas = false;
        });
    }

    /*
     * Load categories the product belongs to.
     */
    function loadCategories() {
        if (ctrl.loadingCategories) {
            return;
        }
        ctrl.loadingCategories = true;
        $scope.product.getCategories()
        .then(function (res) {
            $scope.categories = res.items;
        }, function () {
            alert($translate.instant('Faild to get categories.'));
        })//
        .finally(function () {
            ctrl.loadingCategories = false;
        });
    }

    /**
     * @name removeMetaField
     * @memberOf AmdShopProductCtrl
     * @description Remove a metadata from the metadatas of the product
     * @param {type}
     *            metaData
     */
    function removeMetafield(metaData) {
        confirm($translate.instant('Item will be deleted. There is no undo action.'))//
        .then(function () {
            return $scope.product.deleteMetafield(metaData)//
            .then(function () {
                loadMetas();
                toast($translate.instant('Item is deleted successfully.'));
            }, function () {
                alert($translate.instant('Failed to delete item.'));
            });
        });
    }

    function addMetafield(metadata) {
        var mydata = metadata ? metadata : {};
        $navigator.openDialog({
            templateUrl: 'views/dialogs/metafield-new.html',
            config: {
                data: mydata
            }
        // Create content
        }).then(function (meta) {
            return $scope.product.putMetafield(meta)//
            .then(function () {
                loadMetas();
            }, function () {
                alert($translate.instant('Failed to add new item.'));
            });
        });
    }

    function updateMetafield(metadata) {
        $navigator.openDialog({
            templateUrl: 'views/dialogs/metafield-update.html',
            config: {
                data: metadata
            }
        // Create content
        }).then(function (meta) {
            return $scope.product.putMetafield(meta)//
            .then(function () {
                loadMetas();
            }, function () {
                alert($translate.instant('Failed to update item.'));
            });
        });
    }

    function inlineUpdateMetafield(metadata) {
        return $scope.product.putMetafield(metadata)//
        .then(function () {
            loadMetas();
        }, function () {
            alert($translate.instant('Failed to update item.'));
        });
    }

    /*
     * Assign some categories to the product.
     */
    function selectCategories() {
        loadAllCategories()
        .then(function (allCategories) {
            return cleanCategories(allCategories);
        })
        .then(function (allCategories) {
            return $navigator.openDialog({
                templateUrl: 'views/dialogs/select-categories.html',
                config: {
                    data: allCategories
                }
            });
        })
        .then(function (newCats) {
            updateCategories(newCats);
        });
    }

    var categories = [];
    /*
     * @returns {.$q@call;defer.promise}
     * @description Load all categories defines in the shop
     */
    function loadAllCategories() {
        var pp = new QueryParameter();
        pp.setOrder('name', 'a');
        return $shop.getCategories(pp)//
        .then(function (res) {
            categories = res.items;
            return categories;
        });
    }

    /*
     * @param {type} allCategories
     * @returns {allCategories}
     * @description Add 'selected' field to each category in categories and assign it true or false
     */
    function cleanCategories(allCategories) {
        var deferred = $q.defer();
        for (var i = 0; i < allCategories.length; i++) {
            allCategories[i].selected = false;
            for (var j = 0; j < $scope.categories.length; j++) {
                if ($scope.categories[j].id === allCategories[i].id) {
                    allCategories[i].selected = true;
                }
            }
        }
        deferred.resolve(allCategories);
        return deferred.promise;
    }

    /*
     * @param {type} cats
     * @returns {undefined}
     * @description Push the product's categories to the server
     */
    function updateCategories(cats) {
        $scope.updatingCategories = true;
        var jobs = [];
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].selected) {
                jobs.push($scope.product.putCategory(cats[i]));
            } else {
                jobs.push($scope.product.deleteCategory(cats[i]));
            }
        }
        return $q.all(jobs)
        .then(function () {
            $scope.updatingCategories = false;
            loadCategories();
        });
    }

    /*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
     */
    $scope.remove = remove;
    $scope.update = update;
    $scope.ctrl = ctrl;
    $scope.removeMetafield = removeMetafield;
    $scope.addMetafield = addMetafield;
    $scope.updateMetafield = updateMetafield;
    $scope.inlineUpdateMetafield = inlineUpdateMetafield;
    $scope.selectCategories = selectCategories;

    loadProduct();
});

