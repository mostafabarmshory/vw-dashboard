'use strict';
angular.module('ngMaterialDashboardSeo')

/**
 * @ngdoc controller
 * @name AmdSeoBackendCtrl
 * @description Backend controller
 * 
 * Manages a backend view
 */
.controller('AmdSeoBackendCtrl', function ($scope, $seo, $state, $navigator) {

	/**
     * Remove backend
     * 
     * @memberof AmdSeoBackendCtrl
     * @return {promiss} to remove the backend
     */
	function remove() {
	    if($scope.loadingBackend) {
	        return;
	    }
		confirm('The backend will be deleted. There is no undo action.')//
		.then(function(){
			return $scope.loadingBackend = $scope.backend.delete()//
			.then(function(){
                $navigator.openPage('seo/backends');
            }, function(){
                alert('Fail to delete backend.');
            });
		})//
		.finally(function(){
		    $scope.loadingBackend = false;
		});
	}
	
	/**
     * Save changes
     * 
     * Save all changed of the current backend
     * 
     * @memberof AmdSeoBackendCtrl
     * @return {promiss} to save the backend
     */
	function save(){
		if($scope.loadingBackend){
			return;
		}
		return $scope.loadingBackend = $scope.backend.update()//
		.then(function(){
			toast('Backend is saved');
		})//
		.finally(function(){
		    $scope.loadingBackend = false;
		});
	}

	/**
     * Load the backend
     * 
     * @memberof AmdSeoBackendCtrl
     * @return {promiss} to load the backend
     */
	function load() {
	    if($scope.loadingBackend){
	        return;
	    }
	    $scope.loadingBackend = true;
		return $seo.getBackend($state.params.id)//
		.then(function(backend){
			$scope.backend = backend;
		})
		.finally(function(){
		    $scope.loadingBackend = false;
		});
	}

	$scope.remove = remove;
	$scope.save = save;
	load();
});