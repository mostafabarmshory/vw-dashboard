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
 * @ngdoc controller
 * @name AmdBankReceiptCtrl
 * @description manage a receipt
 * 
 */
mblowfish.controller('AmdBankReceiptCtrl', function ($state, $bank, $window) {

    /**
     * Sets a receipt in the scope
     * 
     * @param receipt
     */
    this.setReceipt = function (receipt) {
        this.receipt = receipt;
        // TODO: set page title
    };

    /**
     * Get the receipt id
     * @returns {string} id of the recept
     */
    this.getReceiptId = function () {
        return ($state.params.id || null);
    };

    /**
     * Loads receipt data
     */
    this.loadReceipt = function () {
        if (this.loading) {
            return;
        }
        this.loading = true;
        var ctrl = this;
        //TODO: maso,2019: Check for graphql
        return $bank.getReceipt(this.getReceiptId())//
        .then(function (receipt) {
            ctrl.setReceipt(receipt);
            return $bank.getBackend(receipt.backend_id);
        }, function (error) {
            ctrl.error = error;
        })//
        .then(function (gate) {
            ctrl.gate = gate;
        })//
        .finally (function () {
            ctrl.loading = false;
        });
    };

    /**
     * Cancel page
     */
    this.cancel = function () {
        $window.history.back();
    };

    this.loadReceipt();
});
