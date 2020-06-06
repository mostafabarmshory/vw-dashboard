
	/**
	 * @ngdoc function
	 * @name saasdmCpanelApp.controller:MainCtrl
	 * @description # MainCtrl Controller of the saasdmCpanelApp
	 */
	mblowfish.controller('SdpAssetCtrl', function($scope, $sdp, $navigator, $state, $location, $mbTranslate, $mbResource, QueryParameter) {

		var ctrl = {
			loadingAsset: true,
			savingAsset: false,
			loadingCategories: false,
			loadingTags: false,
			loadingRelateds: false,
			items: [],
			categories: [],
			tags: [],
			relateds: [],
			allCategories: [],
			edit: false
		};
		var asset;
		var selectedFile;


		function handlError() {
			alert($mbTranslate.instant('faile to load asset'));
		}

		/**
		 * درخواست مورد نظر را از سیستم حذف می‌کند.
		 * 
		 * @param request
		 * @returns
		 */
		function remove() {
			confirm($mbTranslate.instant('The item will be deleted.'))//
				.then(function() {
					return $scope.asset.delete();//
				})//
				.then(function() {
					// TODO: maso, 1395: go to the model page
					$location.path('/assets');
				}, function() {
					alert($mbTranslate.instant('fail to delete asset'));
				});
		}

		function save() {
			ctrl.savingAsset = true;
			if (selectedFile) {
				asset.updateFileOfAsset(selectedFile)//
					.then(function() {
						ctrl.edit = false;
						ctrl.savingAsset = false;
						selectedFile = false;
					}, function() {
						ctrl.edit = false;
						ctrl.savingAsset = false;
						selectedFile = false;
						alert($mbTranslate.instant('Fail to update asset'));
					});
			} else {
				asset.update()//
					.then(function() {
						ctrl.edit = false;
						ctrl.savingAsset = false;
					});
			}
		}

		function changeFile() {
			$navigator//
				.openDialog({
					templateUrl: 'views/dialogs/sdp-select-file.html',
					config: {
						files: []
					}
				})//
				.then(function(conf) {
					selectedFile = conf.files[0].lfFile;
				}, function() {
					alert($mbTranslate.instant('Fail to select file for asset.'));
				});
		}

		function loadCategories() {
			ctrl.loadingCategories = true;
			var pp = new QueryParameter();
			pp.setOrder('id', 'a');
			asset.getCategories(pp)//
				.then(function(clist) {
					ctrl.categories = clist.items;
					ctrl.loadingCategories = false;
				});
		}

		function removeFromCategory(category) {
			category.deleteAsset(asset)//
				.then(loadCategories, function() {
					alert($mbTranslate.instant('fail to load asset from category'));
				});
		}

		function addToCategory() {
			$mbResource
				.get('sdp-category')//
				.then(function(model) {
					return model.putAsset(asset)//
						.then(function() {
							loadCategories();
						}, function() {
							alert('Fail to add new category.');
						});
				});
		}

		function loadTags() {
			ctrl.loadingTags = true;
			var pp = new QueryParameter();
			pp.setOrder('id', 'a');
			asset.getTags(pp)//
				.then(function(clist) {
					ctrl.tags = clist.items;
					ctrl.loadingTags = false;
				});
		}

		function removeTag(tag) {
			tag.deleteAsset(asset)//
				.then(loadTags, function() {
					// alert('fail to load categories of asset');
				});
		}

		function searchCategories(query) {
			if (!query) {
				ctrl.allCategories = [];
				return;
			}
			var pp = new QueryParameter();
			pp.setOrder('id', 'a');
			pp.setQuery(query);
			$sdp.getCategories(pp)//
				.then(function(items) {
					ctrl.allCategories = items.items;
				});
		}

		function addTag() {
			$mbResource
				.get('sdp-tag')//
				.then(function(model) {
					return model.putAsset(asset)//
						.then(function() {
							loadTags();
						}, function() {
							alert('Fail to add new tag.');
						});
				});
		}

		function loadRelations() {
			ctrl.loadingRelateds = true;
			var pp = new QueryParameter();
			pp.setOrder('id', 'a');
			asset.getAssetRelations(pp)//
				.then(function(clist) {
					ctrl.relateds = clist.items;
					ctrl.loadingRelateds = false;
				});
		}

		function removeRelation(relatedAsset) {
			asset.deleteAssetRelation(relatedAsset)//
				.then(loadRelations, function() {
					alert($mbTranslate.instant('fail to delete relation of asset'));
				});
		}

		function addRelation() {
			$navigator.openDialog({
				templateUrl: 'views/dialogs/sdp-relation-new.html',
				config: {
					model: {}
				}
			})//
				.then(function(model) {
					model.start_id = asset.id;
					return asset.putAssetRelation(model)//
						.then(function() {
							loadRelations();
						}, function() {
							alert('Fail to add new relation.');
						});
				});
		}

		function goToAssetPage(id) {
			$location.path('/asset/' + id);
		}

		$scope.goToAssetPage = goToAssetPage;

		/*
		 * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
		 */
		$scope.remove = remove;
		$scope.save = save;
		$scope.changeFile = changeFile;
		$scope.removeFromCategory = removeFromCategory;
		$scope.addToCategory = addToCategory;
		$scope.removeTag = removeTag;
		$scope.addTag = addTag;
		$scope.searchCategories = searchCategories;
		$scope.removeRelation = removeRelation;
		$scope.addRelation = addRelation;

		$scope.ctrl = ctrl;

		function load() {
			// Load asset
			return $sdp.getAsset($state.params.assetId)//
				.then(function(a) {
					ctrl.loadingAsset = false;
					asset = a;
					$scope.asset = a;
					return a;
				}, handlError)
				// load categories
				.then(loadCategories, function() {
					alert($mbTranslate.instant('fail to load categories'));
				})
				// load tags
				.then(loadTags, function() {
					alert($mbTranslate.instant('fail to load tags'));
				})
				// load relateds
				.then(loadRelations, function() {
					alert($mbTranslate.instant('fail to load relateds'));
				});
		}

		load();

	});

