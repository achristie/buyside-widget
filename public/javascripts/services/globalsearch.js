bsApp.factory('globalsearch', function ($http, $q) {
	Entity = function (d) {
		var self = this;

		self.id = d.investor_id;
		self.name = d.investor_name;
		self.type = d.type;
		self.investorAttributes = d.investorAttributes || null;
		self.contactAttributes = d.contactAttributes || null;
	}

	InvestorAttributes = function (d) {
		var self = this;
		
		self.name = d.investor_name;
		self.eqAssets = d.equity_asset;
		self.country = d.country;
		self.city = d.city;
		self.isFund = d.fund_ind;
	}

	ContactAttributes = function (d) {
		self.name = d.first_nm + ' ' + d.last_nm;
	}

	return {
		Entity: function (d) {
			return new Entity(d);
		},
		InvestorAttributes: function (d) {
			return new InvestorAttributes(d);
		},
		ContactAttributes: function (d) {
			return new ContactAttributes(d);
		},
		getEntities: function (q) {
			var ent = [];
			var url = 'https://davos.app.ipreo.com/rest/api/Andrew/BSWSearch.svc/?components=Investor&q=' + q + '&$format=json&$callback=JSON_CALLBACK';

			return $http.jsonp(url).then(function (d) {
				$.each(d.data.Investor, function (i, v) {
					v.type = "investor";
					v.investorAttributes = new InvestorAttributes(v);
					ent.push(new Entity(v));
				});
				return ent;
			});
		}
	}
});

