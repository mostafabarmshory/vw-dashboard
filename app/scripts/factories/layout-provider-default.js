
mblowfish.factory('VwLayoutProviderDefault', function(MbLayoutProvider) {
	var layouts = {
		'default': {
			isClosable: false,
			reorderEnabled: true,
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
				showCloseIcon: true,
				responsiveMode: 'onload',
				tabOverlapAllowance: 0,
				reorderOnTabMenuClick: true,
				tabControlOffset: 10
			},
			dimensions: {
				borderWidth: 5,
				borderGrabWidth: 15,
				minItemHeight: 16,
				minItemWidth: 50,
				headerHeight: 20,
				dragProxyWidth: 300,
				dragProxyHeight: 200
			},
			labels: {
				close: 'close',
				maximise: 'maximise',
				minimise: 'minimise',
				popout: 'open in new window',
				popin: 'pop in',
				tabDropdown: 'additional tabs'
			},
			content: [{
				id: 'main',
				type: 'row',
				isClosable: false,
				reorderEnabled: true,
				content: [{
					type: 'stack',
					isClosable: true,
					reorderEnabled: true,
					activeItemIndex: 0,
					width: 30,
					content: [{
						type: 'component',
						componentName: 'component',
						id: '/mb/ui/views/navigator/',
						isClosable: true,
						title: 'Navigator',
						reorderEnabled: true,
						componentState: {
							params: {},
							pathParams: {},
							url: '/mb/ui/views/navigator/',
							isView: true
						}
					}]
				}, {
					width: 70,
					id: 'editors',
					type: 'stack',
					title: 'Editors',
					isClosable: false,
					reorderEnabled: true,
					activeItemIndex: 0,
					content: [{
						type: 'component',
						componentName: 'component',
						title: 'Welcome',
						isClosable: false,
						isEditor: true,
						id: '/welcome',
						reorderEnabled: true,
						componentState: {
							url: '/welcome',
							isEditor: true,
						},
					}]
				}]
			}],
		},
		'Content Management': {
			isClosable: false,
			reorderEnabled: true,
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
				showCloseIcon: true,
				responsiveMode: 'onload',
				tabOverlapAllowance: 0,
				reorderOnTabMenuClick: true,
				tabControlOffset: 10
			},
			dimensions: {
				borderWidth: 5,
				borderGrabWidth: 15,
				minItemHeight: 16,
				minItemWidth: 50,
				headerHeight: 20,
				dragProxyWidth: 300,
				dragProxyHeight: 200
			},
			labels: {
				close: 'close',
				maximise: 'maximise',
				minimise: 'minimise',
				popout: 'open in new window',
				popin: 'pop in',
				tabDropdown: 'additional tabs'
			},
			content: [{
				id: 'main',
				type: 'row',
				isClosable: false,
				reorderEnabled: true,
				content: [{
					type: 'stack',
					isClosable: true,
					reorderEnabled: true,
					activeItemIndex: 0,
					width: 30,
					content: [{
						id: '/cms/contents',
						type: 'component',
						componentName: 'component',
						isClosable: true,
						title: 'Contents',
						reorderEnabled: true,
						componentState: {
							params: {},
							pathParams: {},
							url: '/cms/contents',
							isView: true
						}
					}, {
						id: '/cms/images',
						type: 'component',
						componentName: 'component',
						isClosable: true,
						title: 'Images',
						reorderEnabled: true,
						componentState: {
							params: {},
							pathParams: {},
							url: '/cms/images',
							isView: true
						}
					}]
				}, {
					width: 35,
					id: 'editors',
					type: 'stack',
					title: 'Editors',
					isClosable: false,
					reorderEnabled: true,
					activeItemIndex: 0,
					content: [{
						id: '/welcome',
						type: 'component',
						componentName: 'component',
						title: 'Welcome',
						isClosable: false,
						isEditor: true,
						reorderEnabled: true,
						componentState: {
							url: '/welcome',
							isEditor: true
						}
					}]
				}, {
					type: 'column',
					isClosable: true,
					reorderEnabled: true,
					width: 35,
					content: [{
						type: 'stack',
						isClosable: true,
						reorderEnabled: true,
						activeItemIndex: 0,
						height: 50,
						content: [{
							id: '/cms/term-taxonomies',
							type: 'component',
							componentName: 'component',
							isClosable: true,
							title: 'Term taxonomis',
							activeItemIndex: 1,
							reorderEnabled: true,
							componentState: {
								params: {},
								pathParams: {},
								url: '/cms/term-taxonomies',
								isView: true
							}
						}]
					}, {
						type: 'stack',
						isClosable: true,
						reorderEnabled: true,
						activeItemIndex: 1,
						width: 35,
						height: 50,
						content: [{
							id: '/cms/terms',
							type: 'component',
							componentName: 'component',
							isClosable: true,
							title: 'Terms',
							reorderEnabled: true,
							componentState: {
								url: '/cms/terms',
								isView: true
							},
						}, {
							id: '/cms/contents-new',
							type: 'component',
							componentName: 'component',
							isClosable: true,
							title: 'Upload',
							reorderEnabled: true,
							componentState: {
								url: '/cms/contents-new',
								isView: true
							}
						}]
					}]
				}]
			}]
		},
		'Shop (Orders)': {
			isClosable: true,
			reorderEnabled: true,
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
				showCloseIcon: true,
				responsiveMode: 'onload',
				tabOverlapAllowance: 0,
				reorderOnTabMenuClick: true,
				tabControlOffset: 10
			},
			dimensions: {
				borderWidth: 5,
				borderGrabWidth: 15,
				minItemHeight: 16,
				minItemWidth: 50,
				headerHeight: 20,
				dragProxyWidth: 300,
				dragProxyHeight: 200
			},
			labels: {
				close: 'close',
				maximise: 'maximise',
				minimise: 'minimise',
				popout: 'open in new window',
				popin: 'pop in',
				tabDropdown: 'additional tabs'
			},
			content: [{
				id: 'main',
				type: 'row',
				isClosable: false,
				reorderEnabled: true,
				content: [{
					type: 'stack',
					isClosable: true,
					reorderEnabled: true,
					activeItemIndex: 0,
					width: 30,
					content: [{
						id: '/shop/orders',
						type: 'component',
						componentName: 'component',
						componentState: {
							params: {},
							pathParams: {},
							url: '/shop/orders',
							isView: true
						},
						isClosable: true,
						title: 'Orders',
						reorderEnabled: true
					}]
				}, {
					width: 70,
					id: 'editors',
					type: 'stack',
					title: 'Editors',
					isClosable: false,
					reorderEnabled: true,
					activeItemIndex: 1,
					content: [{
						type: 'component',
						componentName: 'component',
						title: 'Welcome',
						isClosable: false,
						isEditor: true,
						id: '/welcome',
						reorderEnabled: true,
						componentState: {
							url: '/welcome',
							isEditor: true
						}
					}, {
						id: '/shop/orders-board',
						type: 'component',
						componentName: 'component',
						componentState: {
							params: {},
							pathParams: {},
							url: '/shop/orders-board',
							isView: true
						},
						isClosable: true,
						title: 'Orders Board',
						reorderEnabled: true
					}]
				}]
			}]
		}
	};

	function COMPONENT() {
		MbLayoutProvider.apply(this, arguments);
	}
	COMPONENT.prototype = Object.create(MbLayoutProvider.prototype);

	COMPONENT.prototype.list = function() {
		return Object.getOwnPropertyNames(layouts);
	};
	COMPONENT.prototype.has = function(name) {
		return _.has(layouts, name);
	};
	COMPONENT.prototype.get = function(name) {
		if (!this.has(name)) {
			return;
		}
		return layouts[name];
	};

	return COMPONENT;
});
