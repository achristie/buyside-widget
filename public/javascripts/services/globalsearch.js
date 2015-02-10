bsApp.factory('globalsearch', function ($http, $q, davosUrl) {
	Entity = function (d) {
		var self = this;

		self.id = d.investor_id || d.contact_id;
		self.name = d.investor_name || d.first_nm + ' ' + d.last_nm;
		self.type = d.type;
		self.isExpanded = false;
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
		var self = this;

		self.name = d.first_nm + ' ' + d.last_nm;
		self.roles = d.role_names;
		self.funds = [];

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
			var o = {
				components: 'Investor,Funds',
				variables: 'q=' + q,
				path: 'api/Andrew/BSW/BSWSearch'
			};


			//var url = 'https://davos.app.ipreo.com/rest/api/Andrew/BSWSearch.svc/?components=Investor&q=' + q + '&$format=json&$callback=JSON_CALLBACK';
			var url = davosUrl.getUrl(o);
			console.log(o);

			return $http.jsonp(url).then(function (d) {
				$.each(d.data.Investor, function (i, v) {
					v.type = "Institution";
					v.investorAttributes = new InvestorAttributes(v);
					ent.push(new Entity(v));
				});

				$.each(d.data.Funds, function (i, v) {
					v.type = "Fund";
					v.investorAttributes = new InvestorAttributes(v);
					ent.push(new Entity(v));
				});
				/*
				$.each(d.data.ContactFundsManaged, function (i, v) {
					v.type = "Contact";
					var idx = ent.indexOf(v.id);
					if (idx < 0) {
						//create new
						v.contactAttributes = new ContactAttributes(v);
						ent.push(new Entity(v));
					} else {
						var e = ent[idx]
						e.contactAttributes.funds.push(v)
					}
				})
				*/
				return ent;
			});
		}
	}
});

