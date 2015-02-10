bsApp.controller('SearchResCtrl', function ($scope, $location, $filter, $timeout, globalsearch) {
	$scope.q = $location.search().q;
	$scope.entities = [];

	$scope.$watch('q', function (n, o) {
		globalsearch.getEntities(n).then(function (d) {
			$scope.entities = d;
		});
	});

	$scope.min = function(arr) {
		return $filter('min')($filter('map')(arr, 'id'));
	}

	$scope.addEntity = function () {
		$scope.entities.push(new globalsearch.Entity({investor_name: "andrew", type: "Institution"}));
		console.log($scope.entities);
	}

	$scope.toggleEntityView = function (e, $index) {
		e.isExpanded = !e.isExpanded;
		//i think this is needed due to animation. somewhat buggy w/o.
		$timeout(function () {
			$scope.$broadcast('masonry.reload');
		}, 1)
	}
});