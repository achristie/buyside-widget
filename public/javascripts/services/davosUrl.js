bsApp.factory('davosUrl', function () {
	
	//set these!!
	var env = 'QX',
		type = 'rest';
		token = '';

	var base = env == 'QX' ? 'https://davos.qx.ipreo.com/' : env == 'PROD' ? 'https://davos.app.ipreo.com/' : 'https://davos.qx.ipreo.com/';
		t = type + '/';

	var url = base + t;


	return {
		getUrl: function (o) {
			token = token ? '&' + token : token;
			return url + o.path + '.svc/?$components=' + o.components + '&' + o.variables + '&$format=json&$callback=JSON_CALLBACK' + token;
		}
	}
})