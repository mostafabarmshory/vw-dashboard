/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



/**
 * @ngdoc function
 * @name ngMaterialDashboard.controller:ContentCtrl
 * @description # ContentCtrl Controller of the ngMaterialDashboard
 */
mblowfish.controller('AmdContentCtrl', function(
	$state, $location,

	$scope, $cms, $dispatcher, $window,
	CmsContent, CmsContentMetadata, $resource, $clipboard) {
	var graphqlQuery = '{id,name,title,description,state,creation_dtime,modif_dtime,downloads,file_name,file_size,media_type,mime_type,term_taxonomies{id,taxonomy,term{id,name}},metas{id,key,value}}';

	this.loadingContent = true;
	this.savingContent = false;
	this.items = [];
	this.metadata = [];
	this.edit = false;
	this.content = null;

	this.contentJob = false;
	this.termtaxonomyJob = false;
	this.metadataJob = false;


	function handlError(error) {
		// TODO: maso, 2020: log the error
		alert('faile to load content');
	}

    /**
     * درخواست مورد نظر را از سیستم حذف می‌کند.
     * 
     * @param request
     * @returns
     */
	this.remove = function() {
		var ctrl = this;
		confirm('delete content ' + this.content.id + '?')//
			.then(function() {
				return ctrl.content.delete();//
			})//
			.then(function() {
				// TODO: maso, 1395: go to the model page
				// TODO: close the editor
				$location.path('/cms/contents');
			}, function(error) {
				alert('fail to delete content:' + error.message);
			});
	};

	this.save = function() {
		var ctrl = this;
		this.savingContent = true;
		this.content.update()//
			.then(function() {
				ctrl.edit = false;
				ctrl.savingContent = false;
			}, function() {
				alert('An error is occured while updating content.');
				ctrl.savingContent = false;
			});
	};

	this.addTermTaxonomy = function() {
		var ctrl = this;
		this.termtaxonomyJob = true;
		$resource.get('cms/term-taxonomies', {
			style: {
				title: 'Term taxonomy',
			},
			data: null
		})//
			.then(function(termTaxonomy) {
				// replace with content.putTermTaxonomy()
				return termTaxonomy.putContent(ctrl.content);
			})
			.then(function() {
				// TODO: maso, 2019: flux fire content termtaxonomy added
				ctrl.loadContent();
			})
			.finally(function() {
				ctrl.termtaxonomyJob = false;
			});
	};

	this.removeTermTaxonomy = function(termTaxonomy) {
		var ctrl = this;
		this.termtaxonomyJob = true;
		return this.content.deleteTermTaxonomy(termTaxonomy)
			.then(function() {
				// TODO: maso, 2019: flux fire content termtaxonomy removed
				ctrl.loadContent();
			})
			.finally(function() {
				ctrl.termtaxonomyJob = false;
			});
	};

	this.addMetadata = function() {
		var ctrl = this;
		this.metadataJob = true;
		return $resource.get('/cms/microdata', {
			style: {
				title: 'Term taxonomy',
			},
			data: null
		})
			.then(function(microdata) {
				return ctrl.content.putMetadatum(microdata);
			})
			.then(function(microdata) {
				// fire new data
				$dispatcher.dispatch('/cms/microdata', {
					type: 'create',
					value: microdata
				});
			}, function(error) {
				handleError('Adding Microdatum Fail', 'Fail to add microdatum to the content', error);
			})
			.finally(function() {
				ctrl.metadataJob = false;
			});
	};

	this.deleteMetadata = function(microdata) {
		this.metadataJob = true;
		$window.confirm('Delete the microdata')
			.then(function() {
				return microdata.delete();
			})
			.then(function() {
				// fire new data
				$dispatcher.dispatch('/cms/microdata', {
					type: 'delete',
					value: microdata
				});
				$window.toast('Microdata is removed successfully');
			}, function(error) {
				handleError('Delete Microdata', 'Fail to delete microdatum', error);
			})
			.finally(function() {
				ctrl.metadataJob = false;
			});
	};

	this.updateMetadata = function(microdata) {
		this.metadataJob = true;
		return microdata.update()
			.then(function(microNew) {
				// fire new data
				$dispatcher.dispatch('/cms/microdata', {
					type: 'update',
					value: microNew
				});
			}, function(error) {
				handleError('Update Microdata', 'Fail to update microdatum', error);
			})
			.finally(function() {
				ctrl.metadataJob = false;
			});
	};

	this.setContent = function(content) {
		this.content = new CmsContent(content);
	};

	this.setTermTaxonomies = function(termTaxonomies) {
		this.termTaxonomies = termTaxonomies;
	};

	this.setMetadata = function(metadata) {
		this.metadata = [];
		for (var i = 0; i < metadata.length; i++) {
			var item = new CmsContentMetadata(metadata[i]);
			item.content_id = this.content.id;
			this.metadata.push(item);
		}
	}


	function handleError(title, message, error) {

	}

	// Load content
	this.loadContent = function() {
		var ctrl = this;
		this.loadingContent = true;
		$cms.getContent($state.params.contentId, {
			graphql: graphqlQuery,
		})//
			.then(function(content) {
				// TAXONOMIES
				ctrl.setContent(content);

				// Term taxonomies
				ctrl.setTermTaxonomies(content.term_taxonomies);
				delete content.term_taxonomies;

				// META
				ctrl.setMetadata(content.metas);
				delete content.metas;
			}, handlError)
			.finally(function() {
				ctrl.loadingContent = false;
			});
	};

	this.uploadFile = function() {
		var ctrl = this;
		ctrl.loading = true;
		$resource.get('local-file', {
			style: {
				accept: '*'
			}
		})
			.then(function(file) {
				return ctrl.content.uploadValue(file);
			})
			.then(function(newContent) {
				// TODO: maso, 2019: add notification
				ctrl.content = newContent;
			})
			.finally(function() {
				delete ctrl.loading;
			});
	};

	this.copyContentToClipboard = function() {
		$clipboard.copyTo(this.content);
		// TODO: maso, 2019: add notify
	};

	var ctrl = this;
	this.contentActions = [{
		title: 'Upload new file',
		icon: 'upload',
		action: function() {
			ctrl.uploadFile();
		}
	}, {
		title: 'Copy metadata into clipboard',
		icon: 'copy',
		action: function() {
			ctrl.copyContentToClipboard();
		}
	}];

	this.termtaxonomyActions = [{
		title: 'Add new term-taxonomy',
		icon: 'add',
		action: function() {
			ctrl.addTermTaxonomy();
		}
	}];

	this.metadataActions = [{
		title: 'Add new metadatum',
		icon: 'add',
		action: function() {
			ctrl.addMetadata();
		}
	}];


	function getItemIndex(collection, item) {
		for (var i = 0; i < collection.length; i++) {
			if (collection[i].id == item.id) {
				return i;
			}
		}
		return -1;
	}

	function addToCollection(collection, item) {
		var index = getItemIndex(collection, item);
		if (index >= 0) {
			collection[index] = item;
		} else {
			collection.push(item);
		}
	}

	function removeFromCollection(collection, item) {
		var index = getItemIndex(collection, item);
		if (index >= 0) {
			collection.splice(index, 1);
		}
	}

    /*
     * Load the controller
     */
	var microdataCallback = $dispatcher.on('/cms/microdata', function(data) {
		if (data.value.content_id != ctrl.content.id) {
			return;
		}
		switch (data.type) {
			case 'create':
			case 'update':
				addToCollection(ctrl.metadata, data.value);
				break;
			case 'delete':
				removeFromCollection(ctrl.metadata, data.value);
				break;
		}
	});

	$scope.$on('$destroy', function() {
		$dispatcher.off('/cms/microdata', microdataCallback);
	});

	this.loadContent();
});

