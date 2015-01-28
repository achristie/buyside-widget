var bsApp = angular.module('buysideApp', ['d3', 'ngAnimate', 'ngRoute']);

bsApp.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/index',
				controller: 'IndexCtrl'
			})
			.when('/compare', {
				templateUrl:'partials/compare',
				controller: 'CompareCtrl'
			})
			.when('/listmanagement', {
				templateUrl: 'partials/listmanagement',
				controller: 'ListMgmtCtrl'
			})
			.when('/search', {
				templateUrl: 'partials/searchresults',
				controller: 'SearchResCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	}
]);