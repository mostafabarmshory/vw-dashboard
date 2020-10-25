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

mblowfish.addEditor('/cms/contents/:contentId', {
	templateUrl: 'scripts/module-cms/editors/content-properties.html',
	controllerAs: 'ctrl',
	controller: function($state, $editor, $scope, $mbActions, $controller, $q, $mbResource,
		$cms, CmsContent, CmsContentMetadata) {
		'ngInject';


		// Extends collection controller from MbAbstractCtrl 
		angular.extend(this, $controller('MbAbstractCtrl', {
			$scope: $scope
		}));


		//-------------------------------------------------------------------------
		// Variables
		//-------------------------------------------------------------------------
		var graphqlQuery =
			'{id,name,title,description,state,creation_dtime,modif_dtime,downloads,file_name,file_size,media_type,mime_type,' +
			'term_taxonomies{id,taxonomy,term{id,name}},' +
			'metas{id,key,value}}';
		var contentTermTaxonomiesAssos = AMD_CMS_CONTENT_SP + '/' + $state.params.contentId + '/term-taxonomies';

		var ctrl = this;
		var content;
		var metadata;
		var termTaxonomies;


		//-------------------------------------------------------------------------
		// functions: util
		//-------------------------------------------------------------------------

		function getItemIndex(collection, item) {
			for (var i = 0; i < collection.length; i++) {
				if (collection[i].id === item.id) {
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
		//-------------------------------------------------------------------------
		// functions: content
		//-------------------------------------------------------------------------

		/**
		Deletes content 
		
		@memberof AmdContentCtrl
		 */
		function deleteContent() {
			return confirm('Delete the content?')//
				.then(function() {
					return content.delete()
						.then(function() {
							ctrl.fireDeleted(AMD_CMS_CONTENT_SP, content);
						}, function(/*error*/) {
							// TODO: maso, 2020: log error
							alert('fail to delete content.');
						});
				});
		}

		function updateContent() {
			ctrl.isCuntentBusy = content.update()//
				.then(function(newContent) {
					ctrl.fireUpdated(AMD_CMS_CONTENT_SP, newContent);
				}, function() {
					alert('An error is occured while updating content.');
				})
				.finally(function() {
					delete ctrl.isCuntentBusy;
				});
			return ctrl.isCuntentBusy;
		}

		function uploadFile() {
			ctrl.isCuntentBusy = $mbResource
				.get('file', {
					$style: {
						accept: '.*'
					}
				})
				.then(function(file) {
					return content.uploadValue(file)
						.then(function(newContent) {
							ctrl.fireUpdated(AMD_CMS_CONTENT_SP, newContent);
						});
				})
				.finally(function() {
					delete ctrl.isCuntentBusy;
				});
			return ctrl.isCuntentBusy;
		}

		//
		//	this.copyContentToClipboard = function() {
		//		$clipboard.copyTo(this.content);
		//		// TODO: maso, 2019: add notify
		//	};

		//-------------------------------------------------------------------------
		// functions: term-taxonomies
		//-------------------------------------------------------------------------
		function addTermTaxonomy() {
			return $mbResource
				.get(AMD_CMS_TERMTAXONOMIES_RT, {
					style: {
						title: 'Term taxonomy',
					},
				})
				.then(function(termTaxonomies) {
					var jobs = [];
					var vlaues = [];
					_.forEach(termTaxonomies, function(tt) {
						jobs.push(content.putTermTaxonomy(tt)
							.then(function(newtt) {
								vlaues.push(newtt);
							}));
					});
					ctrl.isTermtaxonomiesBusy = $q.all(jobs)
						.finally(function() {
							ctrl.fireCreated(contentTermTaxonomiesAssos, vlaues);
							delete ctrl.isTermtaxonomiesBusy;
						});
					return ctrl.isTermtaxonomiesBusy;
				});
		}

		function deleteTermTaxonomy(termTaxonomy) {
			ctrl.isTermtaxonomiesBusy = content.deleteTermTaxonomy(termTaxonomy)
				.then(function() {
					ctrl.fireDeleted(termTaxonomy, termTaxonomy);
				})
				.finally(function() {
					delete ctrl.isTermtaxonomiesBusy;
				});
			return ctrl.isTermtaxonomiesBusy;
		}

		//-------------------------------------------------------------------------
		// functions: metadata
		//-------------------------------------------------------------------------
		function createMetadata() {
			return $mbResource
				.get(AMD_CMS_METADATA_RT, {
					style: {
						title: 'Microdatume',
					},
				})
				.then(function(metadata) {
					var jobs = [];
					var values = [];
					_.forEach(metadata, function(metadatum) {
						// TODO: maso, 2020: log error of each jobs
						jobs.push(content.putMetadatum(metadatum)
							.then(function(newMetadatum) {
								values.push(newMetadatum);
							}));
					});
					ctrl.isMicrodataBusy = $q.all(jobs)
						.finally(function() {
							ctrl.fireCreated(AMD_CMS_METADATA_SP, values);
							delete ctrl.isMicrodataBusy;
						});
					return ctrl.isMicrodataBusy;
				});
		}

		function deleteMetadata(microdata, $event) {
			$event = $event || {};
			$event.values = [microdata];
			return $mbActions.exec(AMD_CMS_CONTENT_METADATA_DELET_ACTION, $event);
		}

		function updateMetadata(microdata) {
			ctrl.isMicrodataBusy = microdata.update()
				.then(function(newMicrodatum) {
					ctrl.fireUpdated(AMD_CMS_METADATA_SP, newMicrodatum);
				}, function(/*error*/) {
					// TODO: maso, 2020: Log error
					alert('Fail to update Microdatum.');
				})
				.finally(function() {
					delete ctrl.isMicrodataBusy;
				});
			return ctrl.isMicrodataBusy;
		}



		//-------------------------------------------------------------------------
		// functions: load
		//-------------------------------------------------------------------------
		function setContent(newContent) {
			content = new CmsContent(newContent);
			ctrl.content = content;
		}

		function setTermTaxonomies(termTaxonomiesValues) {
			termTaxonomies = termTaxonomiesValues;
			ctrl.termTaxonomies = termTaxonomies;
		}

		function setMetadata(metadataValue) {
			metadata = [];
			for (var i = 0; i < metadataValue.length; i++) {
				var item = new CmsContentMetadata(metadataValue[i]);
				item.content_id = content.id;
				metadata.push(item);
			}
			ctrl.metadata = metadata;
		}


		// Load content
		function reload() {
			ctrl.isBusy = $cms
				.getContent($state.params.contentId, {
					graphql: graphqlQuery,
				})//
				.then(function(content) {
					setContent(content);
					setTermTaxonomies(content.term_taxonomies);
					setMetadata(content.metas);
					$editor.setTitle('Content:' + content.id);
				})
				.finally(function() {
					delete ctrl.isBusy;
				});
		}


		//-------------------------------------------------------------------------
		// End 
		//-------------------------------------------------------------------------
		ctrl.addEventHandler(AMD_CMS_CONTENT_SP, function(event) {
			if (!content) {
				return;
			}
			_.forEach(event.values, function(value) {
				if (value.id === content.id) {
					switch (event.key) {
						case 'create':
						case 'update':
							_.assign(content, value);
							break;
						case 'delete':
							$editor.close();
							break;
					}
				}
			});
		});

		ctrl.addEventHandler(AMD_CMS_METADATA_SP, function(data) {
			if (!content) {
				return;
			}
			_.forEach(data.values, function(value) {
				if (value.content_id !== content.id) {
					return;
				}
				switch (data.key) {
					case 'create':
					case 'update':
						addToCollection(metadata, value);
						break;
					case 'delete':
						removeFromCollection(metadata, value);
						break;
				}
			});
		});


		ctrl.addEventHandler(contentTermTaxonomiesAssos, function(data) {
			if (!content) {
				return;
			}
			_.forEach(data.values, function(value) {
				switch (data.key) {
					case 'create':
					case 'update':
						addToCollection(termTaxonomies, value);
						break;
					case 'delete':
						removeFromCollection(termTaxonomies, value);
						break;
				}
			});
		});



		_.assign(ctrl, {
			isBusy: false,
			isContentBusy: false,
			isMetadataBusy: false,
			isTermTaxonomiesBusy: false,

			//>> general
			reload: reload,

			//>> content
			deleteContent: deleteContent,
			updateContent: updateContent,
			uploadFile: uploadFile,

			//>> metadata
			updateMetadata: updateMetadata,
			deleteMetadata: deleteMetadata,
			createMetadata: createMetadata,

			//>> term-taxonomies
			addTermTaxonomy: addTermTaxonomy,
			deleteTermTaxonomy: deleteTermTaxonomy,
		});

		reload();
	},
});


