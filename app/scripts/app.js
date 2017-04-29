'use strict';

/**
 * @ngdoc overview
 * @name digidociEmployeeA pp
 * @description
 * # digidociEmployeeApp
 *
 * Main module of the application.
 */
angular
.module('myDashboardApp', [
	'ngMaterialDashboardSpa', //
	'ngMaterialDashboardUser', //
	'ngMaterialDashboardAccount', //
	'ngMaterialDashboardCms', //
	'ngMaterialDashboardBank', //
	'ngMaterialDashboardSeo', //
	])
//	Load application
	.run(function($app) {
		$app.start('my-dashboard');
	})
//	TODO: check dashboard release 2.1
	.config(function ($localStorageProvider) {
		$localStorageProvider.setKeyPrefix('my-dashboard.');
	});


