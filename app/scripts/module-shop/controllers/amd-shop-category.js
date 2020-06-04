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
 * @name AmdShopCategoryCtrl
 */
mblowfish.controller('AmdShopCategoryCtrl', function ($scope, $shop,
        $state, $location, $translate, QueryParameter, $navigator) {

    var ctrl = {
            loading: false,
            saving: false,
            savingCategory: false,
            loadingSubcategories: false,
            loadingServices: false,
            loadingProducts: false,
            edit: false,
            items: [],
            subcategories: [],
            services: [],
            products: [],
            serviceSaving: false,
            addingService: false,
            productSaving: false,
            addingProduct: false,
            parentLoading: false
    };


    function loadCategory() {
        if (ctrl.loading) {
            return;
        }
        ctrl.loading = true;
        $shop.getCategory($state.params.categoryId)//
        .then(function (cat) {
            $scope.category = cat;
            loadParentCategory(cat.parent_id);
            loadSubcategories();
            loadServices();
            loadProducts();
        }, function () {
            alert($translate.instant('Failed to load the category.'));
        })//
        .finally(function () {
            ctrl.loading = false;
        });
    }

    function remove() {
        confirm($translate.instant('Item will be deleted. There is no undo action.'))//
        .then(function () {
            return $scope.category.delete();//
        })//
        .then(function () {
            $location.path('/categories');
        }, function () {
            alert($translate.instant('Fail to delete the category.'));
        });
    }

    function save() {
        if (ctrl.saving) {
            return;
        }
        ctrl.saving = true;
        $scope.category.update()//
        .then(function (newCat) {
            $scope.category = newCat;
            ctrl.edit = false;
        }, function () {
            alert($translate.instant('Failed to save the category.'));
        })//
        .finally(function () {
            ctrl.saving = false;
        });
    }

    function loadSubcategories() {
        if (ctrl.loadingSubcategories) {
            return;
        }
        ctrl.loadingSubcategories = true;
        var pp = new QueryParameter();
        pp.setFilter('parent_id', $scope.category.id);
        $shop.getCategories(pp)//
        .then(function (clist) {
            ctrl.subcategories = clist.items;
        }, function () {
            alert($translate.instant('Failed to load subcategories.'));
        })//
        .finally(function () {
            ctrl.loadingSubcategories = false;
        });
    }

    function loadServices() {
        if (ctrl.loadingServices) {
            return;
        }
        ctrl.loadingServices = true;
        $scope.category.getServices()//
        .then(function (slist) {
            ctrl.services = slist.items;
        }, function () {
            alert($translate.instant('Failed to load services.'));
        })//
        .finally(function () {
            ctrl.loadingServices = false;
        });
    }

    function loadProducts() {
        if (ctrl.loadingProducts) {
            return;
        }
        ctrl.loadingProducts = true;
        $scope.category.getProducts()//
        .then(function (plist) {
            ctrl.products = plist.items;
        }, function () {
            alert($translate.instant('Failed to load products.'));
        })//
        .finally(function () {
            ctrl.loadingProducts = false;
        });
    }


    /**
     * @param {type} id
     * @returns {undefined}
     */
    function loadParentCategory(id) {
        if (ctrl.parentLoading) {
            return;
        }
        if (!id) {
            $scope.parent = {
                    name: 'No parent (Root)'
            };
            return;
        }
        ctrl.parentLoading = true;
        $shop.getCategory(id)//
        .then(function (parent) {
            $scope.parent = parent;
        }, function () {
            alert($translate.instant('Failed to load parent category.'));
        })//
        .finally(function () {
            ctrl.parentLoading = false;
        });
    }

    /**
     * Creates new category
     */
    function addNewCategory() {
        if (ctrl.savingCategory) {
            return;
        }
        return ctrl.savingCategory = $navigator.openDialog({
            templateUrl: 'views/dialogs/category-new.html',
            config: {}
        })
        .then(function (newConfig) {
            newConfig.parent_id = $scope.category.id;
            return $shop.putCategory(newConfig);
        })
        .then(function (cat) {
            ctrl.subcategories = ctrl.subcategories.concat(cat);
        }, function () {
            alert($translate.instant('Fail to create new category.'));
        })//
        .finally(function () {
            ctrl.savingCategory = false;
        });
    }

    /*
     * SERVICE SECTION
     * 
     * Get service properties using dialog
     */

    function addNewService() {
        return $navigator.openDialog({
            templateUrl: 'views/dialogs/service-new.html',
            config: {}
        }).then(function (newConfig) {
            createService(newConfig);
        });
    }

    /*
     * Create service 
     */
    function createService(service) {
        if (ctrl.serviceSaving) {
            return;
        }
        ctrl.serviceSaving = true;
        return $shop.putService(service)
        .then(function (service) {
            return service;
        }, function () {
            alert($translate.instant('Fail to create new service.'));
        })//
        .then(function (service) {
            addServiceToCategory(service);
        })//
        .finally(function () {
            ctrl.serviceSaving = false;
        });
    }

    /*
     * Add service to the services of current category
     */
    function addServiceToCategory(service) {
        if (ctrl.addingService) {
            return;
        }
        ctrl.addingService = true;
        service.itemId = service.id;
        $scope.category.putService(service)//
        .then(function (servic) {
            ctrl.services = ctrl.services.concat(servic);
        }, function () {
            alert($translate.instant('Fail to add service to the category.'));
        })//
        .finally(function () {
            ctrl.addingService = false;
        });
    }


    /*
     * PRODUCT SECTION
     * 
     * Get product properties using dialog
     */
    function addNewProduct() {
        return $navigator.openDialog({
            templateUrl: 'views/dialogs/product-new.html',
            config: {}
        })//
        .then(function (newConfig) {
            createProduct(newConfig);
        });
    }

    /*
     * Create product
     */
    function createProduct(product) {
        if (ctrl.productSaving) {
            return;
        }
        ctrl.productSaving = true;
        return $shop.putProduct(product)
        .then(function (product) {
            return product;
        }, function () {
            alert($translate.instant('Fail to create new product.'));
        })
        .then(function (product) {
            addProductToCategory(product);
        })//
        .finally(function () {
            ctrl.productSaving = false;
        });
    }

    /*
     * Add product to the products of current category
     */
    function addProductToCategory(product) {
        if (ctrl.addingProduct) {
            return;
        }
        ctrl.addingProduct = true;
        product.itemId = product.id;
        $scope.category.putProduct(product)//
        .then(function (prod) {
            ctrl.products = ctrl.products.concat(prod);
        }, function () {
            alert($translate.instant('Fail to add product to the category.'));
        })//
        .finally(function () {
            ctrl.addingProduct = false;
        });
    }

    // Actions
    $scope.categoryActions = [{
        title: 'New category',
        icon: 'add',
        action: addNewCategory
    }];

    $scope.serviceActions = [{
        title: 'New service',
        icon: 'add',
        action: addNewService
    }];

    $scope.productActions = [{
        title: 'New product',
        icon: 'add',
        action: addNewProduct
    }];

    $scope.category = {};
    $scope.remove = remove;
    $scope.save = save;
    $scope.ctrl = ctrl;
    loadCategory();

});

