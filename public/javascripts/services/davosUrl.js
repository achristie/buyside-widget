bsApp.factory('davosUrl', function () {
	
	//set these!!
	var env = 'PROD',
		type = 'rest';
		token = '';

	var base = env == 'QX' ? 'https://davos.qx.ipreo.com/' : env == 'PROD' ? 'https://davos.app.ipreo.com/' : 'https://davos.qx.ipreo.com/';
		t = type + '/';

	var url = base + t;


	return {
		getUrl: function (o) {
			token = token ? '&' + token : token;
			if (!o.variables) { o.variables = ''; }

			var t = url + o.path + '.svc/?';
			if (o.components) {
				t = t + '$components=' + o.components;
			}
			if (o.variables) {
				t = t + '&' + o.variables;
			}
			return t + '&$format=json&$callback=JSON_CALLBACK' + token;
		}
	}
})