'use strict';
angular.module('ngMaterialDashboardSeo')

/**
 * @ngdoc controller
 * @name AmdSeoLinkCtrl
 * @description 
 * 
 * # AmdSeoLinkCtrl Controller of the ngMaterialDashboardSeo
 */
.controller('AmdSeoLinkCtrl', function ($scope, $seo, $routeParams, $navigator) {

	var ctrl = {
		working: false
	};

	function remove() {
		confirm('Link will be deleted. There is no undo action.')//
		.then(function(){
			ctrl.working = true;
			return $scope.link.delete()//
			.then(function(){
                $navigator.openPage('seo/links');
            }, function(){
                alert('fail to delete link');
            });
		})//
		.finally(function(){
			ctrl.working = false;
		});
	}


	function load() {
		ctrl.working = true;
		return $seo.getLink($routeParams.id)//
		.then(function(link){
			$scope.link = link;
		}, function(){
			alert('Failed to load links');
		}).finally(function(){
		    ctrl.working = false;
		});
	}

	$scope.remove = remove;
	$scope.ctrl = ctrl;
	load();
});