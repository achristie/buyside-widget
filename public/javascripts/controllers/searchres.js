bsApp.controller('SearchResCtrl', function ($scope, $location, $filter, globalsearch) {
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
});