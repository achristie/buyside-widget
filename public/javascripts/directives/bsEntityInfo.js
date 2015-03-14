bsApp.directive('bsEntityInfo', function () {
	return {
		restrict: 'E',
		scope: { e: '=entity' },
		templateUrl: 'partials/bs-entity-info',
	}
})