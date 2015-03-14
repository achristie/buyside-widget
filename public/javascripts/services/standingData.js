bsApp.factory('standingData', function (davosUrl, $http, $q) {
	var data = null;

	Industry = function (d) {
		var self = this;

		self.id = d.industry_id;
		self.name = d.industry_name;
		self.parentId = d.parent_industry_id;
		self.level = d.level_name;
		self.children = [];
	}

	Country = function (d) {
		var self = this;

		self.id = d.cntry_id;
		self.name = d.cntry_nm;
		self.regionId = d.region_id;
	}

	Region = function (d) {
		var self = this;

		self.id = d.region_id;
		self.name = d.region_nm;
	}

	function loadIndustries (data) {
		var parents = {},
			arr = [];
		data.Industries = [];
		
		$.each(data, function (i,v) {
			var i = new Industry(v);
			arr.push(i);
		}
		//convert from adjacency list to hierarchy
		function merge(arr, parents) {
			$.each(arr, function (i, v) {
				if (parents.hasOwnProperty(v.parentId)) {

				} else {

				}
			})
		}

	}

	function getData () {
		var o = {
			components: 'RegionService,CountryService,Industry',
			path: 'api/Andrew/BSW/StandingData'
		};
		data = {};
		var url = davosUrl.getUrl(o);
		var promise = $http.jsonp(url).then(function (d) {
			loadIndustries(d.data.Industry);


			return data;
		});

		return promise;
	}


	return {
		getIndustries: function () {
			if (data) {
				return $q.when(data.Industries);
			} else {
				var promise = getData().then(function (d) {
					return $q.when(data.Industries);
				});
				return promise;
			}

		},
		getCountries: function () {

		},
		getRegions: function () {

		},
		getData: function () {
			if (data) {
				return $q.when(data);
			} else {
				var promise = getData().then(function (d) {
					return d;
				});
				
				return promise;
			}
		}
	}
});
