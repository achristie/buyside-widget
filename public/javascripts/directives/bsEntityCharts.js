bsApp.directive('bsEntityCharts', function (d3Service) {
	return {
		restrict: 'E',
		scope: { e: '=entity', data: '=data', valueField: '@' },
		templateUrl: 'partials/bs-entity-charts',
		link: function (scope, ele, attrs) {
			//must have value field as an attribute
			d3Service.d3().then(function (d3) {
				var svg = d3.select(ele[0])
							.append('svg')
							.style('width', '100%');

				window.onresize = function () {
					//scope.$apply();
				};

				scope.$watch(function () {
					return angular.element(window)[0].innerWidth;
				}, function (n, o) {
						scope.render(scope.data); 
				});

				scope.$watch(function () {
					return scope.e.isExpanded;
				}, function (n, o) {
					if (n) {
						scope.render(scope.data);
					}
				})

				scope.render = function (data) {
					if (ele[0].offsetWidth == 0 || !data) { return; }

					//temp
					data = data.filter(function (d) { return d.level == "Macro"; });
					console.log(scope.valueField);
					svg.selectAll('*').remove();

					var w, h, m;
					w = ele[0].offsetWidth - 10
					h = data.length * 15;
					m = 1;

					svg.selectAll('rect')
						.data(data)
						.enter()
							.append('rect')
							.attr('height', 12)
							.attr('width', 0)
							.attr('x', 10)
							.attr('y', function (d, i) {
								return i * 15;
							})
							.transition()
								.duration(1000)
								.attr('width', function (d) {
									return d[scope.valueField]/(m/w);
								});
				}				
			})
		}
	}
})