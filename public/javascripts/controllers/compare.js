bsApp.controller('CompareCtrl', function ($scope, investor) {
	$scope.investors = [];
	$scope.getInv = function (id) {
		var arr = [];
		arr.push(id);
		investor.getInvestors(arr).then(function (d) {
			$scope.investors = d;
		});
	}
});