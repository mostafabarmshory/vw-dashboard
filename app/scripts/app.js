/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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

/*
 * Main module of the application.
 */
angular.module('myDashboardApp', ['mblowfish-core'])

	/***********************************************************************************
	 * Configuration
	 **********************************************************************************/
	.config(function(
		$applicationProvider, $mbLayoutProvider, $mbToolbarProvider, $mbActionsProvider,
		$mbSidenavProvider,
		// TODO: replace with $mbTranslateProvider
		$mbRouteProvider,
		$mbStorageProvider, $locationProvider) {


		//
		// Application storage prefix
		//
		//  All data will be stored in local storage with key. This will be
		// added to all keys. So you can run several application which is 
		// designed based on MB
		$mbStorageProvider.setKeyPrefix('vwstudio.');

		//
		// HTML5 Addess style
		//
		// Enables HTML5 addresss style. SO the #! sign will be removed from
		// the path.
		$locationProvider.html5Mode(true);

		//
		// Application ID
		//
		// Application ID is used to seperate applications from each other. for
		// example you may have studo and dashboard application.
		//
		$applicationProvider.setKey('vwstudio');
		$applicationProvider.setAutoloadConfigs(true);
		$applicationProvider.setAutosaveConfigs(true);



		//
		//  $mbLayout: manages layouts of the system. It is used as a basic layout
		// system to manage views, editors and etc. You are free to add layouts dynamically
		// at runtime.
		//
		// $mbLayoutProvider.setMode('auto');
		$mbLayoutProvider.setDefault('Demo Layout');
		$mbLayoutProvider.addLayout('Demo Layout', {
			settings: {
				hasHeaders: true,
				constrainDragToContainer: true,
				reorderEnabled: true,
				selectionEnabled: true,
				popoutWholeStack: false,
				blockedPopoutsThrowError: true,
				closePopoutsOnUnload: true,
				showPopoutIcon: false,
				showMaximiseIcon: true,
				showCloseIcon: true
			},
			dimensions: {
				borderWidth: 5,
				minItemHeight: 16,
				minItemWidth: 50,
				headerHeight: 20,
				dragProxyWidth: 300,
				dragProxyHeight: 200
			},
			content: [{
				id: 'main',
				type: 'row',
				isClosable: false,
				componentState: {},
				content: [{
					type: 'column',
					isClosable: false,
					content: [{
						id: 'editors',
						type: 'stack',
						title: 'Editors',
						isClosable: false,
						componentState: {},
						content: [{
							type: 'component',
							componentName: 'component',
							title: 'Welcome',
							isClosable: false,
							isEditor: true,
							url: '/mb/iframe/https://www.viraweb123.ir/wb/content/angular-material-dashboard-default-en',
							componentState: {
								isEditor: true,
								url: '/mb/iframe/https://www.viraweb123.ir/wb/content/angular-material-dashboard-default-en',
								params: {
									url: 'https://www.viraweb123.ir/wb/content/angular-material-dashboard-default-en',
								}
							}
						}]
					}]
				}]
			}]
		});


		//
		// $mbAction: manages all actions
		//
		$mbActionsProvider.init({
			items: {
				'mb.app.navigator.toggle': {
					title: 'Navigator',
					description: 'Tooble Navigator Sidenav',
					icon: 'menu',
					/* @ngInject */
					action: function($mbSidenav) {
						$mbSidenav.getSidenav('/app/navigator').toggle();
					}
				}
			}
		});

		$mbSidenavProvider.addSidenav('/app/navigator', {
			title: 'Navigator',
			description: 'Navigate all path and routs of the pandel',
			controller: 'MbNavigatorContainerCtrl',
			controllerAs: 'ctrl',
			templateUrl: 'views/mb-navigator.html',
			locked: 'false',
			position: 'start'
		});
		// $mbRouteProvider.otherwise('/dashboard');


		//
		//  By initializing the main toolbar you can add list of action or component
		// into the toolbar.
		//
		$mbToolbarProvider.init([{
			url: '/dashboard',
			items: ['mb.app.navigator.toggle']
		}, {
			url: '/cms',
			items: []
		}]);
	})


	/***********************************************************************************
	 * Configuration
	 **********************************************************************************/
	.run(function($window) {

		//  Load application
		$window.$crisp = [];
		$window.CRISP_WEBSITE_ID = '55019c32-37d1-46ab-b97e-1b524309deb1';
		$window.loadLibrary('https://client.crisp.chat/l.js');
	});

