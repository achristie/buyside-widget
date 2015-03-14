bsApp.controller('SearchResCtrl', function ($scope, $location, $timeout, globalsearch) {
	$scope.q = $location.search().q;
	$scope.entities = [];

	$scope.$watch('q', function (n, o) {
		globalsearch.getEntities(n).then(function (d) {
			$scope.entities = d;

			$timeout(function () {
				$scope.$broadcast('masonry.reload');
				console.log($scope.entities);
			}, 2500)
		});
	});

	$scope.toggleEntityView = function (ent, event) {
		$scope.$broadcast('masonry.reload');
		ent.isExpanded = !ent.isExpanded;
			
		//i think this is needed due to animation. somewhat buggy w/o.
		$timeout(function () {
			$scope.$broadcast('masonry.reload');
		}, 1)
		$timeout(function () {
			$scope.$broadcast('masonry.reload');
		}, 2500)
	}
});