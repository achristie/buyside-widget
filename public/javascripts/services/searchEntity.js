bsApp.factory('searchEntity', function () {	
	Entity = function (d) {
		var self = this;

		self.id = d.investor_id;
		self.name = d.investor_name;
		self.type = d.type;
		self.isExpanded = false;
		self.investorAttributes = d.investorAttributes || null;
		self.contactAttributes = d.contactAttributes || null;
		self.positions = d.positions || [];
		self.industryPositions = d.industryPositions || [];
	}

	InvestorAttributes = function (d) {
		var self = this;
		
		self.eqAssets = d.equity_asset;
		self.country = d.country;
		self.city = d.city;
		self.isFund = d.fund_ind;
		self.invApproach = d.short_investment_approach_txt;
		self.style = d.style_name;
		self.turnover = d.turnover;
		self.orientation = d.orientation;
		self.fiAssets = d.fi_asset;
		
	}

	Position = function (d) {
		var self = this;

		self.securityId = d.security_id;
		self.ticker = d.ticker;
		self.securityName = d.security_name;
		self.shares = d.share_qty;
		self.value = d.share_amount;
		self.shareChange = d.qty_changed;
		self.valueChange = d.share_amount_changed;
	}

	GeographyPosition = function (d) {
		var self = this;

		self.id = d.country_id;
	}

	IndustryPosition = function (d) {
		var self = this;

		self.id = d.industry_id;
		self.name = d.industry_name;
		self.parentId = d.parent_industry_id;
		self.level = d.level_name;
		self.portPercent = d.portfolio_percent;
		self.value = d.share_amount;
		self.securityCount = d.security_cnt;
		self.valueChange = d.share_amount_changed;
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
		Position: function (d) {
			return new Position(d);
		},
		IndustryPosition: function (d) {
			return new IndustryPosition(d);
		}
	}
});
