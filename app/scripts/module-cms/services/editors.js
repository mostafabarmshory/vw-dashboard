
mblowfish.provider('$amdCmsEditors', function() {

	//-------------------------------------------------
	// Services
	//-------------------------------------------------

	var service,
		provider;

	var location;


	//-------------------------------------------------
	// variables
	//-------------------------------------------------



	//-------------------------------------------------
	// functions
	//-------------------------------------------------
	function openContent(content) {
		// cms/contents/{{::content.id}}
		location.path('cms/contents/' + content.id);
	}


	//-------------------------------------------------
	// init
	//-------------------------------------------------
	service = {
		openContent: openContent,
	};
	provider = {
		$get: function($location) {
			'ngInject';
			location = $location;

			return service;
		}
	};
	return provider;
});


