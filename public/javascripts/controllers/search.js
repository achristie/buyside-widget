bsApp.controller('SearchCtrl', function ($scope, globalsearch, $location) {
	$scope.q = $location.search().q;

	$scope.search = function (e) {
		$location.path('/search')
		$location.search('q', $scope.q);
	}
	
});