/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
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
 * @ngdoc Factories
 * @name QueryParameter
 * @description Manages parameters of a query
 * 
 * بسیاری از داده‌هایی که در سیستم موجود است به صورت صفحه بندی شده در اختیار
 * کاربران قرار می‌گیرد. در این بخش ابزارهایی برای کار با صفحه بندی ارائه شده
 * است.
 * 
 * 
 * از جمله خصوصیاتی که می‌توان در این ساختار قرار داد عبارتند از:
 * 
 * @attr {string} _px_q متن مورد جستجو در فیلدهای مختلف
 * @attr {Integer} _px_p شماره صفحه مورد نظر از فهرست صفحه‌بندی شده
 * @attr {Integer} _px_ps تعداد آیتم‌های موجود در هر صفحه
 * @attr {string} _px_fk نام خصوصیتی که برای فیلتر کردن مورد استفاده قرار
 *       می‌گیرد
 * @attr {string} _px_fv مقداری مورد نظر برای خصوصیتی که بر اساس آن فیلتر انجام
 *       می‌شود.
 * @attr {string} _px_sk نام خصوصیتی که فهرست باید بر اساس آن مرتب شود.
 * @attr {string} _px_so ترتیب مرتب‌سازی، اینکه مرتب‌سازی به صورت صعودی باشد یا
 *       نزولی
 * 
 */

export default class QueryParameter {
	constructor() {
		// init
		this.param = {};
		this.filterMap = {};
		this.sortMap = {};
	}

	_init_filters() {
		var obj = this.filterMap;
		var keys = Object.keys(obj);
		this.param['_px_fk[]'] = [];
		this.param['_px_fv[]'] = [];
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var values = obj[key];
			for (var j = 0; j < values.length; j++) {
				var value = values[j];
				this.param['_px_fk[]'].push(key);
				this.param['_px_fv[]'].push(value);
			}
		}
	}

	_init_sorts() {
		var obj = this.sortMap;
		this.param['_px_sk[]'] = Object.keys(obj);
		// this.param['_px_so[]'] = Object.values(obj);
		this.param['_px_so[]'] = [];
		for (var index = 0; index < this.param['_px_sk[]'].length; index++) {
			var key = this.param['_px_sk[]'][index];
			this.param['_px_so[]'][index] = obj[key];
		}
	}

	setSize(size) {
		this.param._px_ps = size;
		return this;
	}

	setQuery(query) {
		this.param._px_q = query;
		return this;
	}
	/**
	 * تعیین صفحه مورد نظر
	 * 
	 * این فراخوانی صفحه‌ای را تعیین می‌کند که مورد نظر کاربر است. برای
	 * نمونه اگر صفحه دوم از یک کاوش مد نظر باشد باید مقدار یک به عنوان
	 * ورودی این تابع استفاده شود.
	 * 
	 * اندیس تمام صفحه‌ها از صفر شروع می‌شود. بنابر این صفحه اول اندیس صفر و
	 * صفحه دوم اندیس یک دارد.
	 * 
	 * @param int
	 *            $page شماره صفحه
	 * @return QueryParameter خود شئی به عنوان خروجی برگردانده می‌شود.
	 */
	setPage($page) {
		this.param._px_p = $page;
		return this;
	}

	nextPage() {
		if (!this.param._px_p) {
			this.param._px_p = 1;
		}
		this.param._px_p += 1;
		return this;
	}

	setOrder($key, $order) {
		if (!$order) {
			this.removeSorter($key, $order);
		} else {
			this.addSorter($key, $order);
		}
		this._init_sorts();
		return this;
	}

	addSorter($key, $order) {
		if (!$order) {
			return this;
		}
		this.sortMap[$key] = $order;
		this._init_sorts();
		return this;
	}

	removeSorter($key) {
		delete this.sortMap[$key];
		this._init_sorts();
		return this;
	}

	clearSorters() {
		this.sortMap = {};
	}

	/**
	 * Sets new filter and remove all old values
	 * 
	 * @memberof QueryParameter
	 */
	setFilter($key, $value) {
		if (!angular.isDefined($value)) {
			this.removeFilter($key, $value);
		} else {
			this.filterMap[$key] = [];
			this.addFilter($key, $value);
		}
		this._init_filters();
		return this;
	}

	addFilter($key, $value) {
		if (!angular.isDefined($value)) {
			return this;
		}
		if (!angular.isArray(this.filterMap[$key])) {
			this.filterMap[$key] = [];
		}
		this.filterMap[$key].push($value);
		this._init_filters();
		return this;
	}

	removeFilter($key) {
		delete this.filterMap[$key];
		this._init_filters();
		return this;
	}

	/**
	 * Removes all filter options
	 * 
	 * @memberof QueryParameter
	 */
	clearFilters() {
		this.filterMap = {};
	}

	getParameter() {
		return this.param;
	}

	/**
	 * پارامترهای اضافه
	 * 
	 * در برخی از کاربردها نیاز به ارسال پارامترهای بیشتری به سرور هست. این
	 * فراخوانی امکان اضافه کردن پارامترهای اضافه را فراهم می‌کند.
	 * 
	 * @memberof QueryParameter
	 * @since 1.0.2
	 * 
	 * @param Object
	 *            value
	 * @param String
	 *            key کلید پارامتر مورد نظر
	 * @return خود موجودیت
	 */
	put(key, value) {
		this.param[key] = value;
		return this;
	}

	/**
	 * دسترسی به یک پارامترها خاص
	 * 
	 * این فراخوانی برای دسترسی به یک پارامتر خواص در نظر گرفته شده. این
	 * پارامترها معمولا به صورت اضافه برای سرور ارسال می‌شوند.
	 * 
	 * @memberof QueryParameter
	 * @since 1.0.2
	 * 
	 * @param String
	 *            key کلید پارامتر مورد نظر
	 * @return مقدار معادل با کلید
	 */
	get(key) {
		return this.param[key];
	}

}




