'use strict';

angular.module('myDashboardApp')

.run(function($navigator, $monitor, $rootScope) {
    var monitor;
    $rootScope.$on('$userChange', function() {
	$monitor.monitor('user', 'owner')//
	.then(function(mo) {
	    monitor = mo;
	    return monitor.refresh();
	})//
	.then(function() {
	    return $navigator.loadAllItems();
	})//
	.then(function(items) {
	    angular.forEach(items, function(item) {
		if (item.config && item.config.owner) {
		    item.config.hide = !monitor.value;
		}
	    });
	});
    });
});
