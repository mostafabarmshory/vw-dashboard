/**
Profile view

The profile view allow current user to update its own profile

 */
import templateUrl from './profile.html';

export class MbAccountProfileViewCtrl {


	constructor($scope, $mbTranslate, $window, UserProfile, $usr) {
		'ngInject';
		// set initial data
		this.user = null;
		this.profile = null;
		this.loadingProfile = false;
		this.savingProfile = false;

		/*
		 * - normal
		 * - edit
		 */
		this.avatarState = 'normal';

		/**
		 * Loads user data
		 *
		 * @returns
		 */
		this.loadUser = function() {
			$usr.getAccount('current')
				.then(function(account) {
					ctrl.user = account;
					return ctrl.loadProfile();
				});
		};

		this.loadProfile = function() {
			if (this.loadinProfile) {
				return;
			}
			this.loadingProfile = true;
			var ctrl = this;
			return this.user.getProfiles()//
				.then(function(profiles) {
					ctrl.profile = angular.isDefined(profiles.items[0]) ? profiles.items[0] : new UserProfile();
					return ctrl.profile;
				}, function() {
					alert($mbTranslate.instant('Fail to load profile.'));
				})//
				.finally(function() {
					ctrl.loadingProfile = false;
				});
		};

		/**
		 * Save current user
		 *
		 * @returns
		 */
		this.save = function() {
			if (this.savingProfile) {
				return;
			}
			this.savingProfile = true;
			var $promise = angular.isDefined(this.profile.id) ? this.profile.update() : this.user.putProfile(this.profile);
			var ctrl = this;
			return $promise//
				.then(function() {
					toast($mbTranslate.instant('Save is successfull.'));
				}, function() {
					alert($mbTranslate.instant('Fail to save item.'));
				})//
				.finally(function() {
					ctrl.savingProfile = false;
				});
		};

		this.back = function() {
			$window.history.back();
		};

		this.deleteAvatar = function() {
			var ctrl = this;
			confirm($mbTranslate.instant('Delete the avatar?'))
				.then(function() {
					ctrl.avatarState = 'working';
					return ctrl.user.deleteAvatar();
				})
				.finally(function() {
					ctrl.avatarState = 'normal';
				});
		};

		this.uploadAvatar = function(files) {
			if (!angular.isArray(files) || !files.length) {
			}
			var file = null;
			file = files[0];
			this.avatarLoading = true;
			var ctrl = this;
			this.user.uploadAvatar(file)
				.then(function() {
					// TODO: reload the page
				})
				.finally(function() {
					ctrl.avatarLoading = false;
					ctrl.avatarState = 'normal';
				});
		};

		this.editAvatar = function() {
			this.avatarState = 'edit';
		};

		this.cancelEditAvatar = function() {
			this.avatarState = 'normal';
		};

		/*
		 * To support old version of the controller
		 */
		var ctrl = this;
		$scope.load = function() {
			ctrl.loadUser();
		};
		$scope.reload = function() {
			ctrl.loadUser();
		};
		$scope.save = function() {
			ctrl.save();
		};
		$scope.back = function() {
			ctrl.back();
		};
		$scope.cancel = function() {
			ctrl.back();
		};

		// Load account information
		this.loadUser();
	}
}

export default {
	title: 'Profiles',
	description: 'View or update all profiles.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	groups: ['Account'],
	controller: MbAccountProfileViewCtrl
}


