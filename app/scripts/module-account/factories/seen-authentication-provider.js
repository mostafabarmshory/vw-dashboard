

mblowfish.factory('AmdUserAtuthenticationProvider', function(
	$mbUtil, $usr, $http,
	$httpParamSerializerJQLike,
	MbAuthenticationProvider, MbAuthentication) {

	//>> Static methosd
	var USER_DETAIL_GRAPHQL = '{id, login, profiles{first_name, last_name, language, timezone}, roles{id, application, code_name}, groups{id, name, roles{id, application, code_name}}}';
	rolesToPermissions = $mbUtil.rolesToPermissions;
	httpParamSerializerJQLike = $httpParamSerializerJQLike;


	/*
	Pars account data and create an authentication object.
	*/
	function parsAccount(accountData) {
		/*
		 If there is a role x.y (where x is application code and y is code name)
		 in role list then the following var is added in user:
		 */
		//>> Load principal
		permissions = rolesToPermissions(accountData.roles || []);
		_.forEach(accountData.groups, function(group) {
			_.assign(permissions, rolesToPermissions(group.roles || []));
		});


		return new MbAuthentication({
			credentials: {}, // TODO: maso, 2020: load session id from cookis
			details: accountData,
			principal: permissions,
			authenticated: accountData.id,
		});
	}


	Proivder = function() {
		MbAuthenticationProvider.apply(this, arguments);
	}
	Proivder.prototype = Object.create(MbAuthenticationProvider.prototype);

	Proivder.prototype.supports = function(auth) {
		return true;
	};

	Proivder.prototype.authenticate = function(auth) {
		var promise;
		var extParams = {
			graphql: USER_DETAIL_GRAPHQL
		};
		if (auth.password && auth.login) {
			promise = http({
				method: 'POST',
				url: '/api/v2/user/login',
				data: httpParamSerializerJQLike(_.assign({}, auth, extParams)),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(res) {
				return res.data;
			});
		} else {
			promise = $usr.getAccount('current', extParams);
		}
		return promise.then(parsAccount);
	};


	Proivder.prototype.forget = function() {
		return $http({
			method: 'POST',
			url: '/api/v2/user/logout',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function() {
			return new MbAuthentication();
		});
	};


	return Proivder;
});