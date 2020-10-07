mblowfish.wizardPage(SEEN_MODEL_TRANSITION_DATA_WIZARD + '#properties', {
	title: 'Properties',
	description: 'Fill the form to performe the transition.',
	templateUrl: 'scripts/wizards/model-transition-data/transition-properties.html',
	controllerAs: 'ctrl',
	controller: function($transition, $wizard) {
		'ngInject';
		this.properties = $transition.properties;
		this.data = $wizard.data;
		
		this.updateData = function(date){
			_.forEach(date, function(value, key){
				$wizard.setData(key, value);
			});
		};
	},
	isPageComplete: function() {
		'ngInject';
		// TODO: check the form validations
		return true;
	}
});