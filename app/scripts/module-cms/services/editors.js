
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
		var mimetype = mbMimetype.parse(mimetypeString);
		var editors = [];
		var registred = mbEditor.getRegesterdEditors();
		_.forEach(registred, function(editor, name) {
			if (!_.isArray(editor.supportedMimetypes)) {
				return;
			}
			_.forEach(editor.supportedMimetypes, function(type) {
				if (mbMimetype.isEqual(mimetype, type)) {
					editor.name = name;
					editors.push(editor);
				}
			});
		});
		return editors;
	}

	function getEditorsName(mimetypeString) {
		if (editorCache[mimetypeString]) {
			return editorCache[mimetypeString];
		}
		var names = [];
		var editors = getEditors(mimetypeString);
		_.forEach(editors, function(editor) {
			names.push(editor.name);
		});
		editorCache[mimetypeString] = names;
		return names;
	}

	function openContent(content, name) {
		if (!content.mime_type) {
			throw new TypeError('Content type is not define');
		}
		// finally
		if (name) {
			return location.path(name.replace(':contentId', content.id));
		}
		//		else {
		//			// TODO: maso, 2020: find editors from settings
		//		}

		// find editor
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
		getEditors: getEditors,
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


