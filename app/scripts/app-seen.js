/*
 * Copyright (c) 2015 Phoenix Scholars Co. (http://dpq.co.ir)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * @ngdoc Modules
 * @name seen
 * @description Manages basics of seen API
 * 
 * 
 */
window.seen = (function() {

	var SeenStaticResourceCatch = function() {
		// TODO: maso, add options
		this.repository = {};
	};
	SeenStaticResourceCatch.prototype.has = function(url) {
		return (url in this.repository);
	};
	SeenStaticResourceCatch.prototype.get = function(url) {
		return this.repository[url];
	};
	SeenStaticResourceCatch.prototype.put = function(url, object) {
		this.repository[url] = object;
	};
	SeenStaticResourceCatch.prototype.clean = function() {
		this.repository = {};
	};


	function capitalizeFirstLetter(name) {
		return name.charAt(0).toUpperCase() + name.slice(1);
	}
    /**
     * Return plural name of the input name. 
     * 
     * Revert convert plural name to singular
     */
	function pluralName(name, revert) {
		var plural = {
			'(quiz)$': '$1zes',
			'^(ox)$': '$1en',
			'([m|l])ouse$': '$1ice',
			'(matr|vert|ind)ix|ex$': '$1ices',
			'(x|ch|ss|sh)$': '$1es',
			'([^aeiouy]|qu)y$': '$1ies',
			'(hive)$': '$1s',
			'(?:([^f])fe|([lr])f)$': '$1$2ves',
			'(shea|lea|loa|thie)f$': '$1ves',
			'sis$': 'ses',
			'([ti])um$': '$1a',
			'(tomat|potat|ech|her|vet)o$': '$1oes',
			'(bu)s$': '$1ses',
			'(alias)$': '$1es',
			'(octop)us$': '$1i',
			'(ax|test)is$': '$1es',
			'(us)$': '$1es',
			'([^s]+)$': '$1s'
		};

		var singular = {
			'(quiz)zes$': '$1',
			'(matr)ices$': '$1ix',
			'(vert|ind)ices$': '$1ex',
			'^(ox)en$': '$1',
			'(alias)es$': '$1',
			'(octop|vir)i$': '$1us',
			'(cris|ax|test)es$': '$1is',
			'(shoe)s$': '$1',
			'(o)es$': '$1',
			'(bus)es$': '$1',
			'([m|l])ice$': '$1ouse',
			'(x|ch|ss|sh)es$': '$1',
			'(m)ovies$': '$1ovie',
			'(s)eries$': '$1eries',
			'([^aeiouy]|qu)ies$': '$1y',
			'([lr])ves$': '$1f',
			'(tive)s$': '$1',
			'(hive)s$': '$1',
			'(li|wi|kni)ves$': '$1fe',
			'(shea|loa|lea|thie)ves$': '$1f',
			'(^analy)ses$': '$1sis',
			'((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': '$1$2sis',
			'([ti])a$': '$1um',
			'(n)ews$': '$1ews',
			'(h|bl)ouses$': '$1ouse',
			'(corpse)s$': '$1',
			'(us)es$': '$1',
			's$': ''
		};

		var irregular = {
			'move': 'moves',
			'foot': 'feet',
			'goose': 'geese',
			'sex': 'sexes',
			'child': 'children',
			'man': 'men',
			'tooth': 'teeth',
			'person': 'people'
		};

		var uncountable = [
			'sheep',
			'fish',
			'deer',
			'moose',
			'series',
			'species',
			'money',
			'rice',
			'information',
			'equipment'
		];

		// save some time in the case that singular and plural are the same
		if (uncountable.indexOf(name.toLowerCase()) >= 0) {
			return name;
		}

		// check for irregular forms
		var pattern, replace;
		for (var irName in irregular) {
			if (!revert) {
				pattern = new RegExp(irregular[irName] + '$', 'i');
				replace = irName;
			} else {
				pattern = new RegExp(irName + '$', 'i');
				replace = irregular[irName];
			}
			if (pattern.test(name)) {
				return name.replace(pattern, replace);
			}
		}

		var array;
		if (!revert) {
			array = plural;
		} else {
			array = singular;
		}

		// check for matches using regular expressions
		for (var reg in array) {
			pattern = new RegExp(reg, 'i');
			if (pattern.test(name)) {
				return name.replace(pattern, array[reg]);
			}
		}

		if (!revert) {
			return name + 's';
		} else {
			return name;
		}
	}

	function singularName(name) {
		return pluralName(name, true);
	}

    /*
     * Converts first litter to lower case
     */
	function jsLcfirst(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	}

	//  /*
	//  * Converts first litter to uper case
	//  */
	//  function jsUcfirst(string) 
	//  {
	//  return string.charAt(0).toUpperCase() + string.slice(1);
	//  }

    /**
     * 
     * @ngInject
     */
	function putObject($config, $http, $httpParamSerializerJQLike, $injector) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		// update model
		$config.headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		$config.method = $config.method || 'POST';
		var Factory = $injector.get($config.factory || $config.name);
		return function(objectData) {
			$config.url = Mustache.render(urlTemplate, this);
			// Check if type is file
			if (objectData instanceof File) {
				var formdata = new FormData();
				formdata.append('file', objectData);
				return $http.post($config.url, formdata, {
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				});
			}
			$config.data = $httpParamSerializerJQLike(objectData);
			return $http($config)//
				.then(function(res) {
					var item = res.data;
					if (Factory) {
						item = new Factory(item);
					}
					return item;
				});
		};
	}

    /**
     * 
     * @ngInject
     */
	function deleteObjects($config, $http) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'DELETE';
		return function(queryParameter) {
			if (queryParameter) {
				$config.params = queryParameter.getParameter();
			} else {
				$config.params = {};
			}
			$config.url = Mustache.render(urlTemplate, this);
			return $http($config)//
				.then(function(res) {
					return res.data;
				});
		};
	}
    /**
     * 
     * @ngInject
     */
	function deleteObjectById($config, $http) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'DELETE';
		return function(id) {
			$config.url = Mustache.render(urlTemplate, this);
			$config.url = $config.url + '/' + id;
			return $http($config)//
				.then(function(res) {
					return res.data;
				});
		};
	}

    /**
     * 
     * @ngInject
     */
	function deleteChildObject($config, $http) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'DELETE';
		return function(object) {
			$config.url = Mustache.render(urlTemplate, this) + '/' + object.id;
			return $http($config);
		};
	}
    /**
     * 
     * @ngInject
     */
	function putObjects($config, $http, $injector, PaginatedCollection) {
		// update model
		$config.method = $config.method || 'POST';
		var Factory = $injector.get($config.factory || $config.name);
		return function(objectData) {
			$config.data = objectData;
			return $http($config)//
				.then(function(res) {
					var page = new PaginatedCollection(res.data);
					var items = [];
					for (var i = 0; i < page.items.length; i++) {
						var item = page.items[i];
						if (Factory) {
							item = new Factory(item);
						}
						items.push(item);
					}
					page.items = items;
					return page;
				});
		};
	}

    /**
     * Generate a method to get list of objects
     * 
     * @ngInject
     */
	function getObjects($config, $http, PaginatedCollection, $injector) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'GET';

		var Factory = $injector.get($config.factory || $config.name);

		return function(queryParameter) {
			if (queryParameter) {
				$config.params = queryParameter.getParameter();
			} else {
				$config.params = {};
			}
			$config.url = Mustache.render(urlTemplate, this);
			return $http($config)//
				.then(function(res) {
					var page = new PaginatedCollection(res.data);
					var items = [];
					for (var i = 0; i < page.items.length; i++) {
						var item = page.items[i];
						if (Factory && !$config.params.graphql) {
							item = new Factory(item);
						}
						items.push(item);
					}
					page.items = items;
					return page;
				});
		};
	}



    /**
     * Generates a method to get an object
     * 
     * @ngInject
     */
	function getObject($config, $http, $injector) {
		// Cache templates
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		// update model
		$config.method = $config.method || 'GET';
		var Factory = $injector.get($config.factory || $config.name);
		return function(id, requestParams) {
			if (!requestParams) {
				requestParams = {};
			}
			$config.url = Mustache.render(urlTemplate, _.merge(this, {
				params: {
					id: id
				}
			}));
			$config.params = requestParams;
			return $http($config)//
				.then(function(res) {
					var obj = res.data;
					if (Factory) {
						obj = new Factory(res.data);
					}
					return obj;
				});
		};
	}

    /**
     * Updates an object
     * 
     * @ngInject
     */
	function postObject($config, $http, $httpParamSerializerJQLike) {
		// Cache templates
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		// update model
		$config.headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		$config.method = $config.method || 'POST';
		return function(objectData) {
			$config.url = Mustache.render(urlTemplate, this);
			$config.data = $httpParamSerializerJQLike(objectData || this);
			var scope = this;
			return $http($config)//
				.then(function(res) {
					if (angular.isFunction(scope.setData)) {
						scope.setData(res.data);
						return scope;
					}
					return res.data;
				});
		};
	}

    /*
     * Deletes an objects
     * 
     * @ngInject
     */
	function deleteObject($config, $http) {
		// Cache templates
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'DELETE';
		return function() {
			$config.url = Mustache.render(urlTemplate, this);
			var scope = this;
			return $http($config)//
				.then(function() {
					return scope;
				});
		};
	}

    /*
     * @ngInject
     */
	function getObjectSchema($q, $config, $http, $catch) {
		// Cache templates
		var urlTemplate = $config.url + '/schema';
		Mustache.parse(urlTemplate, ['{', '}']);
		// update model
		$config.method = $config.method || 'GET';
		return function(requestParams) {
			if (!requestParams) {
				requestParams = {};
			}
			$config.url = Mustache.render(urlTemplate, this);
			if ($catch.has($config.url)) {
				return $q.when($catch.get($config.url));
			}
			$config.params = requestParams;
			var promise = $http($config)//
				.then(function(res) {
					$catch.put($config.url, res.data);
					return res.data;
				});
			$catch.put($config.url, promise);
			return promise;
		};
	}

    /*
     * Generate download function
     * 
     * @ngInject
     */
	function downloadResource($config, $http) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'GET';
		return function() {
			$config.url = Mustache.render(urlTemplate, this);
			return $http($config)
				.then(function(res) {
					return res.data;
				});
		};
	}

    /*
     * Generate upload function
     * 
     * @ngInject
     */
	function uploadResource($config, $http) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'POST';
		return function(newValue) {
			// TODO: maso, 2018: check if newValue is a file.
			$config.url = Mustache.render(urlTemplate, this);
			var promiss;
			if (!(newValue instanceof File)) {
				$config.data = newValue;
				promiss = $http($config);
			} else {
				var formdata = new FormData();
				formdata.append('file', newValue);
				promiss = $http.post($config.url, formdata, {
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				});
			}
			// update the object
			var scope = this;
			return promiss.then(function(result) {
				scope.setData(result.data);
				return scope;
			});
		};
	}

    /*
     * Generate delete resource function
     * 
     * @ngInject
     */
	function deleteResource($config, $http) {
		var urlTemplate = $config.url;
		Mustache.parse(urlTemplate, ['{', '}']);
		$config.method = $config.method || 'DELETE';
		return function() {
			$config.url = Mustache.render(urlTemplate, this);
			return $http($config)
				.then(function(res) {
					return res.data;
				});
		};
	}

	// Default object
	var SObject = function(data) {
		if (data) {
			this.setData(data);
		}
	};
	SObject.prototype = {
		setData: function(data) {
			angular.extend(this, data);
		},
		isAnonymous: function() {
			return !(this.id && this.id > 0);
		},
		isExpired: function() {
			// NOTE: maso, 2018: to be compatible with pluf
			return false;
		}
	};


    /**
     * 
     * Builders
     * 
     * this feature allow users to creates factories easy and fast.
     * 
     * types:
     * <ul>
     * <li>collection</li>
     * <li>item</li>
     * <li>binary</li>
     * <li>state</li>
     * </ul>
     * 
     * Here is an example
     * 
     * 
     * @example <caption>Creates a factory</caption> <code><pre>
     * var factories = [ {
     *     name : 'Content',
     *     path : '/api/v2/cms/contents',
     *     download : {
     *         type : 'binary',
     *         path : '/download'
     *     }
     * } ];
     * for (var i = 0; i &lt; factories.length; i++) {
     *     module.factory(factory.name, seen.factory(factory));
     * }
     * </pre></code>
     * 
     * @memberof seen
     * @param config
     *            {object} configuration to build new factory
     * 
     */
	function createFactory(config) {

        /**
         * Generates new instance of factory
         * 
         * @ngInject
         */
		function _factory_generator($injector) {
			var factory = function() {
				SObject.apply(this, arguments);

				if (angular.isArray(config.resources)) {
					for (var i = 0; i < config.resources.length; i++) {
						var resource = config.resources[i];
						// TODO: maso, 2018: assert name not null
						var name = capitalizeFirstLetter(resource.name);
						var pName = pluralName(name);
						var sName = singularName(name);

						var locals = {
							'$config': _.assign({}, resource, {
								url: config.url + '/{id}' + resource.url
							}),
							'$catch': sysCatch,
						};

						if (resource.type === 'collection') {
							// Check if is created
							if (angular.isFunction('get' + pName)) {
								continue;
							}
							factory.prototype['get' + pName] = $injector.invoke(getObjects, factory, _.cloneDeep(locals));
							factory.prototype['get' + sName] = $injector.invoke(getObject, factory, {
								'$config': _.assign({}, resource, {
									url: config.url + '/{id}' + resource.url + '/{params.id}'
								}),
								'$catch': sysCatch,
							});
							factory.prototype['delete' + pName] = $injector.invoke(deleteObjects, factory, _.cloneDeep(locals));
							factory.prototype['delete' + sName] = $injector.invoke(deleteChildObject, factory, _.cloneDeep(locals));
							factory.prototype['put' + pName] = $injector.invoke(putObjects, factory, _.cloneDeep(locals));
							factory.prototype['put' + sName] = $injector.invoke(putObject, factory, _.cloneDeep(locals));
							factory.prototype[jsLcfirst(sName) + 'Schema'] = $injector.invoke(getObjectSchema, factory, {
								'$config': _.cloneDeep(locals.$config),
								'$catch': schemaResourceCatch,
							});
						} else if (resource.type === 'binary') {
							// Check if is created
							if (angular.isFunction('download' + sName)) {
								continue;
							}
							factory.prototype['download' + sName] = $injector.invoke(downloadResource, factory, _.cloneDeep(locals));
							factory.prototype['upload' + sName] = $injector.invoke(uploadResource, factory, _.cloneDeep(locals));
							factory.prototype['delete' + sName] = $injector.invoke(deleteResource, factory, _.cloneDeep(locals));
						}
					}
				}
			};
			factory.prototype = new SObject();

			factory.prototype.update = $injector.invoke(postObject, factory, {
				'$config': _.merge({}, config, {
					url: config.url + '/{id}'
				}),
				'$catch': sysCatch,
			});
			factory.prototype.delete = $injector.invoke(deleteObject, factory, {
				'$config': _.merge({}, config, {
					url: config.url + '/{id}'
				}),
				'$catch': sysCatch,
			});
			return factory;
		}

		return _factory_generator;
	}

    /**
     * Creates new service and return as result
     * 
     * @memberof seen
     * @param config
     *            {object}
     */
	function createService(config) {
		config.resources = config.resources || [];

		// TODO inject services
        /*
         * @ngInject
         */
		var newService = function($injector) {
			var scope = this;
			// TODO: maso, 2018: check and init service
			for (var i = 0; i < config.resources.length; i++) {
				var resource = config.resources[i];
				// TODO: maso, 2018: assert name not null
				var name = capitalizeFirstLetter(resource.name);
				var pName = pluralName(name);
				var sName = singularName(name);

				scope['get' + pName] = $injector.invoke(getObjects, this, {
					'$config': _.assign({}, resource),
					'$catch': sysCatch,
				});
				scope['get' + sName] = $injector.invoke(getObject, this, {
					'$config': _.assign({}, resource, {
						url: resource.url + '/{params.id}'
					}),
					'$catch': sysCatch,
				});
				scope['delete' + pName] = $injector.invoke(deleteObjects, this, {
					'$config': _.assign({}, resource),
					'$catch': sysCatch,
				});
				scope['delete' + sName] = $injector.invoke(deleteObjectById, this, {
					'$config': _.assign({}, resource),
					'$catch': sysCatch,
				});
				scope['put' + pName] = $injector.invoke(putObjects, this, {
					'$config': _.assign({}, resource),
					'$catch': sysCatch,
				});
				scope['put' + sName] = $injector.invoke(putObject, this, {
					'$config': _.assign({}, resource),
					'$catch': sysCatch,
				});
				scope[jsLcfirst(sName) + 'Schema'] = $injector.invoke(getObjectSchema, this, {
					'$config': _.assign({}, resource),
					'$catch': schemaResourceCatch,
				});
			}
		};
		return newService;
	}


	// api
	var sysCatch = null; // XXX: maso, 2018: add cache manager
	var schemaResourceCatch = new SeenStaticResourceCatch();
	return {
		factory: createFactory,
		service: createService,

		// Util
		pluralName: pluralName,
		singularName: singularName
	};
}());



/*
 * XXX: new feature of seen
 *
 * Cache objects
 *
 * By adding cache of object, we can improve our performance.
 *
 * SEE: - https://github.com/rsms/js-lru
 *
 */
