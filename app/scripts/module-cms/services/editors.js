
mblowfish.provider('$amdCmsEditors', function() {

	//-------------------------------------------------
	// Services
	//-------------------------------------------------

	var service,
		provider;

	// >> services
	var location,
		mbMimetype,
		mbEditor;

	//-------------------------------------------------
	// variables
	//-------------------------------------------------
	var editorCache = {};

	//-------------------------------------------------
	// functions
	//-------------------------------------------------
	function getEditors(mimetypeString) {
		if (editorCache[mimetypeString]) {
			return editorCache[mimetypeString];
		}
		var mimetype = mbMimetype.parse(mimetypeString);
		var editors = [];
		var registred = mbEditor.getRegesterdEditors();
		_.forEach(registred, function(editor, name) {
			if (!_.isArray(editor.supportedMimetypes)) {
				return;
			}
			_.forEach(editor.supportedMimetypes, function(type) {
				if (mbMimetype.isEqual(mimetype, type)) {
					editors.push(name);
				}
			});
		});
		editorCache[mimetypeString] = editors;
		return editors;
	}

	function openContent(content) {
		if (!content.mime_type) {
			throw new TypeError('Content type is not define');
		}
		// finally
		var editors = getEditors(content.mime_type);
		// find editor
		if (editors.length > 0) {
			var name = editors[0];
			var url = name.replace(':contentId', content.id);
			return location.path(url);
		}
		return openProperties(content);
	}

	function openProperties(content) {
		return location.path('cms/contents/' + content.id);
	}


	//-------------------------------------------------
	// init
	//-------------------------------------------------
	service = {
		openContent: openContent,
		openProperties: openProperties,
	};
	provider = {
		$get: function($location, $mbMimetype, $mbEditor) {
			'ngInject';
			location = $location;
			mbMimetype = $mbMimetype;
			mbEditor = $mbEditor;

			return service;
		}
	};
	return provider;
});


