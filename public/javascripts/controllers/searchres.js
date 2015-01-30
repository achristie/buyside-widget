bsApp.controller('SearchResCtrl', function ($scope, $location, $filter, globalsearch) {
	$scope.q = $location.search().q;
	$scope.entities = [];
	$scope.activeEntity = {
		index: 0,
		type: ''
	};

	$scope.$watch('q', function (n, o) {
		globalsearch.getEntities(n).then(function (d) {
			$scope.entities = d;
		});
	});

	$scope.min = function(arr) {
		return $filter('min')($filter('map')(arr, 'id'));
	}

	$scope.toggleActive = function (e, $index) {
		$scope.activeEntity = { type: e.type, index: $index };
	}
});