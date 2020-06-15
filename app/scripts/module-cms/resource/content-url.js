

mblowfish.controller('AmdCmsContentUrlResourceCtrl', function($scope, $resource, $controller) {
	/*
	 * Extends collection controller
	 */
	angular.extend(this, $controller('AmWbSeenCmsContentsCtrl', {
		$scope: $scope
	}));

	/**
	 * Sets the absolute mode
	 *
	 * @param {boolean}
	 *            absolute mode of the controler
	 */
	this.setAbsolute = function(absolute) {
		this.absolute = absolute;
	}

	/**
	 * Checks if the mode is absolute
	 *
	 * @return absolute mode of the controller
	 */
	this.isAbsolute = function() {
		return this.absolute;
	}

	/*
	 * Sets value
	 */
	this.setSelected = function(content) {
		this.selected = content;
		var path = '/api/v2/cms/contents/' + content.id + '/content';
		if (this.isAbsolute()) {
			path = getDomain() + path;
		}
		$resource.setValue(path);
	}

	this.isSelected = function(content) {
		return this.selected && this.selected.id === content.id;
	};

	// init the controller
	this.init()
});