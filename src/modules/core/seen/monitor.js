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

import mblowfish from 'mblowfish';
import seen from '../../../seen'
/**
 * @ngdoc Factories
 * @name MonitorCategory
 * @description  Monitor category
 */
mblowfish.factory('MonitorCategory', seen.factory({
	url: '/api/v2/monitor/categories',
	resources: [{
		name: 'Metric',
		factory: 'MonitorMetric',
		type: 'collection',
		url: '/metrics'
	}]
}));

/**
 * @ngdoc Factories
 * @name MonitorMetric
 * @description  Monitor metric
 */
mblowfish.factory('MonitorMetric', seen.factory({
	url: '/api/v2/monitor/metrics'
}));



/**
 * @ngdoc Services
 * @name $monitor
 * @description  Monitor backend service
 */
mblowfish.service('$monitor', seen.service({
	resources: [{
		name: 'Category',
		factory: 'MonitorCategory',
		type: 'collection',
		url: '/api/v2/monitor/categories'
	}, {
		name: 'Metric',
		factory: 'MonitorMetric',
		type: 'collection',
		url: '/api/v2/monitor/metrics'
	}]
}));
