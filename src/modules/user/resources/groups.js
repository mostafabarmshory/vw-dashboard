mblowfish.addResource('amd-seen-user-groups', {
	title: 'Account Groups',
	templateUrl: 'scripts/module-user/resources/groups.html',
	tags: [AMD_USER_GROUPS_RT],
	controllerAs: 'ctrl',
	controller: function($scope, $resource, $controller, $style) {
		'ngInject';
		angular.extend(this, $controller('MbSeenUserGroupsCtrl', {
			$scope: $scope
		}));
		var ctrl = this;

		function setSelected(group, selected) {
			var groups = [];
			_.forEach(ctrl.items, function(item) {
				if ($style.multi && item.selected) {
					groups.push(item);
				} else {
					delete item.isSelected;
				}
			});
			group.selected = selected;
			if (selected) {
				groups.push(group);
			}
			$resource.setValue(groups);
		}

		function isSelected(group) {
			return group.selected;
		}

		_.assign(ctrl, {
			setSelected: setSelected,
			isSelected: isSelected,
		});
	}
});


