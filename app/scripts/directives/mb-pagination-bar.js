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
XXX: refactor to

@deprecated

@ngdoc Directives
@name mb-query-parameter-toolbar

@description A toolbar to edit query parameter.

Seen Query Parameters is a complex data structure and it is hard to manage
it with a simple view. This is a toolbar to eidit and view a query options. 
The query parameter is passed as an ng-model to the toolbar.

An schema url is used to fetche related object details such as properites,
keys, limits and types.


@example
<mb-query-parameter-toolbar
	ng-model="ctrl.queryParameter"
	ng-model-change="ctrl.reload()"
	ng-model-options="{debounce: 300}">
</mb-query-parameter-toolbar>

 */

/**
@ngdoc Directives
@name mb-pagination-bar
@property {Object}    mb-model           -Data model
@property {function}  mb-reload          -Reload function
@property {Array}     mb-sort-keys       -Array
@property {Array}     mb-properties      -Array
@property {Array}     mb-more-actions    -Array
@property {string}    mb-title           -String
@property {string}    mb-icon            -String
@description Pagination bar

Pagination parameters are a complex data structure and it is hard to manage
it. This is a toolbar to manage the pagination options. mb-reload get a function 
as reload. mb-sort-keys get an array of keys which is used in sort section of 
pagination bar and the sort could be done based on this keys. mb-properties get
an array of keys which is used in filter section of pagination bar. really mb-properties
gets children array of schema of a collection. The controller of collection is 
responsible to get the schema of a collection and pass it's children array to this 
attribute of directive. The directive itself do the required work to set the values
in filter section.

 */
mblowfish.directive('mbPaginationBar', function(MbAction, $window, $timeout, $parse) {
	return {
		restrict: 'E',
		templateUrl: 'scripts/directives/mb-pagination-bar.html',
		scope: {
            /*
             * مدل صفحه بندی را تعیین می‌کند که ما اینجا دستکاری می‌کنیم.
             */
			mbModel: '=',
            /*
             * تابعی را تعیین می‌کند که بعد از تغییرات باید برای مرتب سازی
             * فراخوانی شود. معمولا بعد تغییر مدل داده‌ای این تابع فراخوانی می‌شود.
             */
			mbReload: '@?',
            /*
             * تابعی را تعیین می‌کند که بعد از تغییرات باید برای ذخیره آیتم‌های موجود در لیست
             * فراخوانی شود. این تابع معمولا باید بر اساس تنظیمات تعیین شده در مدل داده‌ای کلیه آیتم‌های فهرست را ذخیره کند.
             */
			mbExport: '=',
            /*
             * یک آرایه هست که تعیین می‌که چه کلید‌هایی برای مرتب سازی باید استفاده
             * بشن.
             */
			mbSortKeys: '=',
            /*
             * آرایه ای از آبجکتها که بر اساس فیلدهای هر آبجکت کلیدهایی برای فیلتر کردن استخراج می شوند
             */
			mbProperties: '=?',

			/* titles corresponding to sort keys */
			mbSortKeysTitles: '=?',

            /*
             * فهرستی از عمل‌هایی که می‌خواهیم به این نوار ابزار اضافه کنیم
             */
			mbMoreActions: '=',

			mbTitle: '@?',
			mbIcon: '@?',

			mbEnableSearch: '=?'
		},
		link: function(scope, element, attrs) {

			var query = {
				sortDesc: true,
				sortBy: typeof scope.mbSortKeys === 'undefined' ? 'id' : scope.mbSortKeys[0],
				searchTerm: null
			};
			/*
			 * مرتب سازی مجدد داده‌ها بر اساس حالت فعلی
			 */
			function __reload() {
				if (!angular.isDefined(attrs.mbReload)) {
					return;
				}
				$parse(attrs.mbReload)(scope.$parent);
			}
			/**
			 * ذخیره اطلاعات آیتم‌ها بر اساس مدل صفحه بندی
			 */
			function exportData() {
				if (!angular.isFunction(scope.mbExport)) {
					return;
				}
				scope.mbExport(scope.mbModel);
			}

			function searchQuery() {
				scope.mbModel.setQuery(scope.query.searchTerm);
				__reload();
			}

			function focusToElementById(id) {
				$timeout(function() {
					var searchControl;
					searchControl = $window.document.getElementById(id);
					searchControl.focus();
				}, 50);
			}

			function setSortOrder() {
				scope.mbModel.clearSorters();
				var key = scope.query.sortBy;
				var order = scope.query.sortDesc ? 'd' : 'a';
				scope.mbModel.addSorter(key, order);
				__reload();
			}

			/*
			 * Add filter to the current filters
			 */
			function addFilter() {
				if (!scope.filters) {
					scope.filters = [];
				}
				scope.filters.push({
					key: '',
					value: ''
				});
			}

			function putFilter(filter, index) {
				scope.filters[index] = {
					key: filter.key,
					value: filter.value
				};
			}

			function applyFilter() {
				scope.reload = false;
				scope.mbModel.clearFilters();
				if (scope.filters && scope.filters.length > 0) {
					scope.filters.forEach(function(filter) {
						if (filter.key !== '' && filter.value && filter.value !== '') {
							scope.mbModel.addFilter(filter.key, filter.value);
							scope.reload = true;
						}
					});
				}
				if (scope.reload) {
					__reload();
				}
			}

			/*
			 * Remove filter to the current filters
			 */
			function removeFilter(filter, index) {
				Object.keys(scope.mbModel.filterMap).forEach(function(key) {
					if (key === filter.key) {
						scope.mbModel.removeFilter(scope.filters[index].key);
					}
				});
				scope.filters.splice(index, 1);
				if (scope.filters.length === 0) {
					__reload();
				}
			}

			function setFilterValue(value, index) {
				scope.filterValue = value;
				putFilter(index);
			}


			//Fetch filters from children array of collection schema
			function fetchFilterKeys() {
				scope.mbProperties.forEach(function(object) {
					scope.filterKeys.push(object.name);
				});
			}

			scope.runAction = function(action, $event) {
				var newAction = action;
				if (!(newAction instanceof MbAction)) {
					newAction = new MbAction(action);
				}
				return newAction.exec($event);
			};

			scope.showBoxOne = false;
			scope.focusToElement = focusToElementById;
			// configure scope:
			scope.searchQuery = searchQuery;
			scope.setSortOrder = setSortOrder;
			scope.addFilter = addFilter;
			scope.putFilter = putFilter;
			scope.applyFilter = applyFilter;
			scope.removeFilter = removeFilter;
			//scope.setFilterKey = setFilterKey;
			scope.setFilterValue = setFilterValue;
			scope.__reload = __reload;
			scope.query = query;
			if (angular.isFunction(scope.mbExport)) {
				scope.exportData = exportData;
			}
			if (typeof scope.mbEnableSearch === 'undefined') {
				scope.mbEnableSearch = true;
			}

			scope.$watch('mbProperties', function(mbProperties) {
				if (angular.isArray(mbProperties)) {
					scope.filterKeys = [];
					fetchFilterKeys();
				}
			});
		}
	};
});
