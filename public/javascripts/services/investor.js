bsApp.factory('investor', function ($http, $q) {
	Investor = function (d) {
		var self = this;

		self.id = d.investor_id;
		self.name = d.investor_name;
		self.positions = [];
		self.ownByGeo = [];
		self.ownByInd = [];
		self.assetBreakdown = [];

		self.addPosition = function (p) {
			self.positions.push(p);
		}

		self.addGeo = function (o) {
			self.ownByGeo.push(o);
		}

		self.addInd = function (o) {
			self.ownByInd.push(o);
		}

		self.addIAB = function (o) {
			self.assetBreakdown.push(o);
		}

	}


	Position = function (d) {
		var self = this;

		self.securityId = d.security_id;
		self.positionDate = d.position_date;
		self.portfolioDate = d.quarter_end_dt;
		self.ticker = d.ticker;
		self.shares = d.share_qty;
		self.value = d.share_amt;
		self.shareChg = d.qty_changed;
	}

	var combineData = function (arr) {
		var a = [];

		$.each(arr, function (i, v) {
			if (investors.hasOwnProperty(v)) {
				a.push(investors[v]);
			}
		});
		return a;
	};


	var investors = {};

	return {
		Investor: function (d) {
			return new Investor(d);
		},
		getInvestors: function (arr) {
			if (!$.isArray(arr)) {
				throw 'getInvestors demands an array';
			}

			var cachedId = [],
				nonCachedId = [];

			$.each(arr, function (i, v) {
				if (!v) return;
				if(investors.hasOwnProperty(v)) {
					cachedId.push(v);
				} else {
					nonCachedId.push(v);
				}
			});

			if (nonCachedId.length > 0) {
				var ids = nonCachedId.join(','),
					url = 'https://davos.app.ipreo.com/rest/api/Andrew/BSW.svc/?components=Investor,Ownership&InvestorId=[' + ids + ']&$format=json&$callback=JSON_CALLBACK';

				promise = $http.jsonp(url).then(function (d) {
					$.each(d.data.Investor, function (i, v) {
						investors[v.investor_id] = new Investor(v);
					});

					$.each(d.data, function (k, v) {
						if (v == null || k === "Investor") { return; }

						$.each(v, function (i, r) {
							if (k === "Ownership") {
								var obj = new Position(r);	
								investors[r.investor_id].addPosition(obj);
								return;
							}
							if (k === "OwnershipByIndustry") {
								var obj = new OwnByInd(r);
								investors[r.investor_id].addInd(obj);
								return;
							}
						})

					});
					return combineData(arr);
				});
			} else {
				var dfd = $q.defer();
				promise = dfd.promise;
				dfd.resolve(combineData(arr));
			}
			return promise
		}
	}
})