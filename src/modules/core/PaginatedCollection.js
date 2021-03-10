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

import SeenObject from './SeenObject';

/**
 * @ngdoc Factories
 * @name PaginatedCollection
 * @description The result of search
 * 
 * 
 * @see QueryParameter
 */
export default class PaginatedCollection extends SeenObject {
	constructor(data) {
		super(data);
	}

	/**
	 * Check if there is more page in collection
	 * 
	 * @memberof PaginatedCollection
	 * @return {boolean} true if there exists more page
	 */
	hasMore() {
		return (this.current_page < this.page_number);
	}

	/**
	 * Check if it is the first page
	 * 
	 * @memberof PaginatedCollection
	 * @return {boolean} true if this is the first page
	 */
	isFirst() {
		return this.current_page === 1;
	}

	/**
	 * Gets next page index
	 * 
	 * @memberof PaginatedCollection
	 * @return {integer} index of the next page
	 */
	getNextPageIndex() {
		return this.current_page + 1;
	}

	/**
	 * Gets next page index
	 * 
	 * @memberof PaginatedCollection
	 * @return {integer} index of the previous page
	 */
	getPreviousPageIndex() {
		return this.current_page - 1;
	}
}

