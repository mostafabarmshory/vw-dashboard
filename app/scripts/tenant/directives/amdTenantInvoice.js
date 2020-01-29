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

angular.module('ngMaterialDashboardTenant')
.directive('amdTenantInvoice', function(){
    function postLink($scope,$element,$attributes,$ctrls){
       var ngModel = $ctrls[0] ;
       ngModel.$render = function(){
           $scope.invoice = ngModel.$modelValue;
       };
    }
    return {
      restrict: 'E',
      templateUrl: 'views/amd-directives/amd-tenant-invoice.html',
      scope: {
        disableId: '<amdDisableId',
        title: '@'
      },
      link : postLink,
/*    controller: 'the name of a controller defined in controllers',
 * or directly -> controller: function(){
 *                      define every ctrls to act on view
 *                  }             */

      require : ['ngModel']
    };
  });
  
