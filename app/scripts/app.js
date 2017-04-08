'use strict';

/**
 * @ngdoc overview
 * @name digidociEmployeeApp
 * @description
 * # digidociEmployeeApp
 *
 * Main module of the application.
 */
angular
  .module('myDashboardApp', [
    'ngMaterialDashboard', //
    'ng-appcache', //
  ])
// Load application
.run(function($app) {
	$app.start('my-dashboard');
})
// TODO: check dashboard release 2.1
.config(function ($localStorageProvider) {
    $localStorageProvider.setKeyPrefix('my-dashboard.');
});


