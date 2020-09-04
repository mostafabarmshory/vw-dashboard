
/**
This action prform list of transitions into the list of models

- values: list of models (which are transable)
- transition: a transition to perform
- storeType: the model type to propagate evetns

 */
mblowfish.action(SEEN_MODEL_TRANSITIONS_CREATE, {
	title: 'Put a transition',
	icon: 'settings',
	action: function($event, $q, $mbLog, $mbDispatcherUtil) {
		'ngInject';
		//>> precondition
		var values = $event.values || [];
		var transition = $event.transition;
		if(!values || !values.length){
			return $q.reject('No model specified');
		}
		if(!transition){
			// TODO: let user select a new one
			return $q.reject('Transition is required');
		}
		//>> Get parameters
		var action = {
			id: transition.id
		};
		
		// for each model
		var promise;
		if (!transition.properties || !transition.properties.length) {
			promise = action;
		} else {
			promise = $mbWizard.open(SEEN_MODEL_TRANSITION_DATA_WIZARD)
				.then(function(data) {
					action = _.assign(action, data);
				});
		}
		
		//>> put transitions
		var successModel = [],
			faildModel = [];
		return $q.when(promise)
			.then(function(){
				// 1- perform
				var jobs = [];
				_.forEach(values, function(model){
					jobs.push(model.putTransition(action)
						.then(function(newModel){
							successModel.push(newModel);
						}, function(error){
							// TODO: maso, 2020: show error the the client
							faildModel.push(error)
							$mbLog.error(error);
						}));
				});
				return $q.all(jobs);
			})
			.then(function(){
				// 2- fire
				if($event.storePath && successModel.length){
					$mbDispatcherUtil.fireEvent($event.storePath, action.id, successModel);
				}
				// show error
				if(faildModel.length){
					alert('Failt to perform transition on some items');
				}
			});
	}
});