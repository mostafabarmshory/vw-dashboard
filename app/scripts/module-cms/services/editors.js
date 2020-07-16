
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
		// finally
		return openProperties(content);
	}

	function openProperties(content) {
		location.path('cms/contents/' + content.id);
	}


	//-------------------------------------------------
	// init
	//-------------------------------------------------
	service = {
		openContent: openContent,
		openProperties: openProperties,
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


