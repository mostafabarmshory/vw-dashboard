mblowfish.action(SEEN_QP_FILTERS_UPDATE_ACTION, {
	title: 'Update sorts',
	icon: 'sort',
	action: function($event, $q, $mbResource) {
		'ngInject';
		var values = $event.values || [];
		var schema = $event.schema;
		if(values.length === 0){
			return $q.reject('No value sets');
		}
		if(!schema){
			return $q.reject('Schmea is required');
		}
		var queryParam = values[0];
		return $mbResource.get(SEEN_QP_FILTERS_RT, {
			$value: queryParam,
			$schema: schema,
		});
	}
});