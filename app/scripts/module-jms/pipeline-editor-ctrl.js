
/**
 * @ngdoc controller
 * @name AmdJmsPipelineCtrl
 * @description pipeline controller
 * 
 * Manages a pipeline view
 */
mblowfish.controller('AmdJmsPipelineCtrl', function($scope, $jms, $state, $navigator) {

	/**
     * Remove pipeline
     * 
     * @memberof AmdJmsPipelineCtrl
     * @return {promiss} to remove the pipeline
     */
	function remove() {
		if ($scope.loadingPipeline) {
			return;
		}
		confirm('The pipeline will be deleted. There is no undo action.')//
			.then(function() {
				return $scope.loadingPipeline = $scope.pipeline.delete()//
					.then(function() {
						$navigator.openPage('pipelines');
					}, function() {
						alert('Fail to delete pipeline.');
					});
			})//
			.finally(function() {
				$scope.loadingPipeline = false;
			});
	}

	/**
     * Save changes
     * 
     * Save all changed of the current pipeline
     * 
     * @memberof AmdJmsPipelineCtrl
     * @return {promiss} to save the pipeline
     */
	function save() {
		if ($scope.loadingPipeline) {
			return;
		}
		return $scope.loadingPipeline = $scope.pipeline.update()//
			.then(function() {
				toast('Pipeline is saved');
			})//
			.finally(function() {
				$scope.loadingPipeline = false;
			});
	}

	/**
     * Load the pipeline
     * 
     * @memberof AmdJmsPipelineCtrl
     * @return {promiss} to load the pipeline
     */
	function load() {
		if ($scope.loadingPipeline) {
			return;
		}
		$scope.loadingPipeline = true;
		return $jms.getPipeline($state.params.id)//
			.then(function(pipeline) {
				$scope.pipeline = pipeline;
			})
			.finally(function() {
				$scope.loadingPipeline = false;
			});
	}

	$scope.remove = remove;
	$scope.save = save;
	load();
});