mblowfish.addView('/seo/links-new', {
	controllerAs: 'ctrl',
	templateUrl: 'scripts/module-seo/views/links-new.html',
	groups: ['seo'],
	title: 'New sitemap link',
	icon: 'add',
	controller: function($scope, $seo, $navigator) {
		'ngInject';
		var ctrl = {
			status: 'relax'
		};

		function addLink(model) {
			ctrl.status = 'working';
			$seo.putLink(model)//
				.then(function(link) {
					$navigator.openPage('seo/links/' + link.id);
				}, function() {
					alert('failed to add a new link.');
				})//
				.finally(function() {
					ctrl.status = 'relax';
				});
		}

		function cancel() {
			$navigator.openPage('seo/links');
		}

		function formatDate(date) {
			return moment(date).format('YYYY-MM-DD');
		}

		$scope.formatDate = formatDate;
		$scope.changeFrequencies = [{
			value: 'always',
			title: 'Always'
		}, {
			value: 'hourly',
			title: 'Hourly'
		}, {
			value: 'daily',
			title: 'Daily'
		}, {
			value: 'weekly',
			title: 'Weekly'
		}, {
			value: 'monthly',
			title: 'Monthly'
		}, {
			value: 'yearly',
			title: 'Yearly'
		}, {
			value: 'never',
			title: 'Never'
		}];

		$scope.addLink = addLink;
		$scope.cancel = cancel;
		$scope.ctrl = ctrl;
	},
});