
/**
This is a general implementaint of an item editor controller.

Item is an instance of SeenObject. So the id is the main attribute of 
an item to identify.

## General use cases

- Handle sotre path event and manage current view state
- Signal to reaload
- Calls general update action
- Calls general delete action

## Customization

If the current model is not a seend model, then following function is
called:

- deleteItem: delete current Item
- updateItem: update current item with changes

## Setup

Following object is very important:

- Model
- Store Path

To setup the controller:

	this.setModel(model)
		.setStorePath(stoerPath);


 */
mblowfish.controller('SeenAbstractItemEditorCtrl', function($scope, $controller, $editor,
	$mbActions) {

	/*
	 * Extends collection controller from MbAbstractCtrl 
	 */
	angular.extend(this, $controller('SeenAbstractCtrl', {
		$scope: $scope
	}));

	/*
	 Generate default event handler
	 
	 If you are about to handle event with a custom function, please
	 override this function.
	 */
	this.eventHandlerCallBack = function() {
		if (this.$eventHandlerCallBack) {
			return this.$eventHandlerCallBack;
		}
		var ctrl = this;
		this.$eventHandlerCallBack = function($event) {
			var isMatch = false;
			var values = $event.values;
			_.forEach(values, function(value) {
				if (value.id === ctrl.model.id) {
					isMatch = true;
				}
			})
			if (!isMatch) {
				return;
			}
			switch ($event.key) {
				case 'delete':
					$editor.close();
					break;
				case 'updated':
				default:
					if (_.isFunction(ctrl.reload)) {
						ctrl.reload();
					}
					break;
			}
		};
		return this.$eventHandlerCallBack;
	};

	/**
	Sets the store path
	
	All events related to the object is published based on the store path.
	
	@param {string} storePath the path of the store
	@returns the controller itself
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.setStorePath = function(storePath) {
		if (this.storePath === storePath) {
			return this;
		}
		var callback = this.eventHandlerCallBack();
		if (this.storePath) {
			this.removeEventHandler(callback);
		}
		this.storePath = storePath;
		this.addEventHandler(this.storePath, callback);
		return this;
	};

	/**
	Sets the model
	
	This model is controlled and followed by the editor controller.
	
	@param {Object} model The modell to controll and follow
	@returns the controller itself
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.setModel = function(model) {
		this.model = model;
		return this;
	};

	/**
	 Adds the given transition to object. 

	In other word, do some transaction on SPA.
	
	@param {object} $transition To add to the current model.
	@param {Object} $event to pupulate into the system.
	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.putTransition = function(transition, $event) {
		return this.setJob($mbActions.exec(SEEN_MODEL_TRANSITIONS_CREATE, _.assign($event || {}, {
			values: [this.model],
			transition: transition,
			storePath: this.storePath,
		})));
	};

	/**
	 Call general delete action on a seen model.

	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.deleteModel = function($event) {
		var deleteModel;
		var ctrl = this;
		if (!_.isFunction(this.model.delete)) {
			deleteModel = function() {
				ctrl.deleteItem();
			}
		}
		return this.setJob($mbActions.exec(SEEN_MODEL_DELETE_ACTION, _.assign($event || {}, {
			values: [this.model],
			storePath: this.storePath,
			deleteModel: deleteModel,
		})));
	};

	/**
	 Call general update action on a seen model.

	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.updateModel = function($event) {
		var updateModel;
		var ctrl = this;
		if (!_.isFunction(this.model.update)) {
			updateModel = function() {
				ctrl.updateItem();
			}
		}
		return this.setJob($mbActions.exec(SEEN_MODEL_UPDATE_ACTION, _.assign($event || {}, {
			values: [this.model],
			storePath: this.storePath,
			updateModel: updateModel,
		})));
	};

	/**
	Sets current controller job
	
	The controller is designe to do a single job at time.
	
	The current job lets the controller to know how login dose it tacke to run.
	
	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.setJob = function(prommise) {
		var ctrl = this;
		this.isBusy = prommise
			.finally(function() {
				delete ctrl.isBusy;
			});
		return this.isBusy;
	};

	this.setTransitions = function(transitions) {
		this.transitions = transitions;
		return this;
	};
});