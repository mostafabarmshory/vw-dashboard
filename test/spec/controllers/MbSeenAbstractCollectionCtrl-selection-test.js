'use strict';

describe('MbSeenAbstractCollectionCtrl controller', function() {
	// load the controller's module
	var
		$controller,
		$rootScope,
		items = [{
			id: 1,
		}, {
			id: 2,
		}, {
			id: 3,
		}];
	// Initialize the controller and a mock scope
	beforeEach(function() {
		angular.module('test', [
			'mblowfish-core',
			//	load legecy angular modules
			'seen-core',
			'seen-user',
			'seen-tenant',
			'seen-supertenant',
			'seen-cms',
			'seen-monitor',
			'seen-shop',
			'seen-seo',

			'vcRecaptcha', //https://github.com/VividCortex/angular-recaptcha
			'ngFileSaver',//
		]);
		module('test');
		inject(function(_$controller_, _$rootScope_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
		});
	});

	it('should be initialized with a config', function() {
		var ctrl = $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $rootScope.$new()
		});
		expect(_.isFunction(ctrl.init)).toBe(true);
	});

	it('should select all and clear selection', function() {
		var ctrl = $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $rootScope.$new()
		});
		ctrl.init({
			eventType: '/text/items',
		});
		ctrl.pushViewItems(items);

		expect(ctrl.hasSelected()).toBe(false);
		expect(ctrl.getSelectionSize()).toBe(0);

		ctrl.selectAll();
		expect(ctrl.hasSelected()).toBe(true);
		expect(ctrl.getSelectionSize()).toBe(items.length);

		ctrl.clearSelection();
		expect(ctrl.hasSelected()).toBe(false);
		expect(ctrl.getSelectionSize()).toBe(0);
	});

	it('should toggle section of an item', function() {
		var ctrl = $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $rootScope.$new()
		});
		ctrl.init({
			eventType: '/text/items',
		});
		ctrl.pushViewItems(items);


		ctrl.toggleSelection(items[0]);
		expect(ctrl.hasSelected()).toBe(true);
		expect(ctrl.getSelectionSize()).toBe(1);

		ctrl.toggleSelection(items[0]);
		expect(ctrl.hasSelected()).toBe(false);
		expect(ctrl.getSelectionSize()).toBe(0);

		ctrl.toggleSelection(items[0]);
		expect(ctrl.hasSelected()).toBe(true);
		expect(ctrl.getSelectionSize()).toBe(1);

		ctrl.clearSelection();
		expect(ctrl.hasSelected()).toBe(false);
		expect(ctrl.getSelectionSize()).toBe(0);
	});


	it('should set section of an item', function() {
		var ctrl = $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $rootScope.$new()
		});
		ctrl.init({
			eventType: '/text/items',
		});
		ctrl.pushViewItems(items);

		ctrl.setSelected(items[0], true);
		expect(ctrl.hasSelected()).toBe(true);
		expect(ctrl.getSelectionSize()).toBe(1);

		ctrl.setSelected(items[0], true);
		expect(ctrl.hasSelected()).toBe(true);
		expect(ctrl.getSelectionSize()).toBe(1);

		ctrl.toggleSelection(items[0]);
		expect(ctrl.hasSelected()).toBe(false);
		expect(ctrl.getSelectionSize()).toBe(0);

		ctrl.setSelected(items[0], true);
		ctrl.setSelected(items[0], false);
		expect(ctrl.hasSelected()).toBe(false);
		expect(ctrl.getSelectionSize()).toBe(0);
	});


	it('should set section of an item', function() {
		var ctrl = $controller('MbSeenAbstractCollectionCtrl', {
			$scope: $rootScope.$new()
		});
		ctrl.init({
			eventType: '/text/items',
		});
		ctrl.pushViewItems(items);

		items[0].$selected = true;
		ctrl.setSelected(items[0], true);
		expect(ctrl.hasSelected()).toBe(true);
		expect(ctrl.getSelectionSize()).toBe(1);

		items[0].$selected = false;
		ctrl.setSelected(items[0], true);
		expect(ctrl.hasSelected()).toBe(true);
		expect(ctrl.getSelectionSize()).toBe(1);
		expect(items[0].$selected).toBe(true);

		items[0].$selected = false;
		ctrl.setSelected(items[0], false);
		expect(ctrl.hasSelected()).toBe(false);
		expect(ctrl.getSelectionSize()).toBe(0);
		expect(items[0].$selected).toBe(false);
	});
});
