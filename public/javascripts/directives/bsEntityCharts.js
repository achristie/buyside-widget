bsApp.directive('bsEntityCharts', function () {
	return {
		restrict: 'E',
		scope: { e: '=entity' },
		templateUrl: 'partials/bs-entity-charts'
	}
})