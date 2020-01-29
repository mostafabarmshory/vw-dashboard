'use strict';

angular.module('ngMaterialDashboardCollection')

/**
 * @ngdoc controller
 * @name AmdBankGates
 * @description Manages bank backends
 * 
 */
.controller('AmdDocumentCtrl', function($scope, $navigator, $location, /*$collection, */$routeParams) {

	var ctrl = {
			state: 'ok',
			items: []
	};



	/**
	 * Loads collection
	 * 
	 * @returns
	 */
	function reload(){
		ctrl.status = 'working';
		$collection.collection($routeParams.collectionId)//
		.then(function(collection){
			$scope.collection = collection;
			return collection.document($routeParams.documentId);
		}, function(error){
			$scope.collection = null;
			ctrl.status = 'notFound';
			ctrl.error = error;
		})//
		.then(function(document){
			$scope.document = document;
			$scope.keys=[];
			for(var key in $scope.document){
				if(!angular.isFunction($scope.document[key])){
					$scope.keys.push(key);
				}
			}
		})//
		.finally(function(){
			ctrl.status = 'ok';
		});
	}
	
	/**
	 * Adding new key
	 * 
	 * @returns
	 */
	function addKey(){
		prompt('Enter new key:')//
		.then(function(key){
			$scope.keys.push(key);
		});
	}
	
	/**
	 * Removes key and value
	 * 
	 * @param key
	 * @returns
	 */
	function removeKey(key){
		$scope.document[key] = '';
		var index = $scope.keys.indexOf(key);
		if (index > -1) {
			$scope.keys.splice(index, 1);
		}
	}
	
	function saveDocument(){
		$scope.document.update()//
		.then(function(){
			toast('Document saved');
		}, function(error){
			alert('Fail to save document:' + error.data.message);
		});
	}
	
	function deleteDocument(){
		confirm('delete document ' + $scope.document.id +'?')//
		.then(function(){
		    return $scope.document.remove()//
		})//
		.then(function(){
			$location.path('collections/' + $scope.collection.id);
		}, function(error){
			alert('Fail to remove document:' + error.data.message);
		});
	}

	$scope.saveDocument = saveDocument;
	$scope.deleteDocument = deleteDocument;
	$scope.addKey = addKey;
	$scope.removeKey = removeKey;
	$scope.reload = reload;
	$scope.ctrl = ctrl;
	
//	reload();
});

