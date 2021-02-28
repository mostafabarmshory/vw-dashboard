
export default {
	title: 'VW Studio External',
	icon: 'text',
	template: '<iframe></iframe>',
	controllerAs: 'ctrl',
	supportedMimetypes: [
		'application/weburger+json'
	],
	controller: function($state, $editor, $cms, $httpParamSerializer, $mbLocal, $window) {
		'ngInject';
		//------------------------------------------------------------------
		// Functions
		//------------------------------------------------------------------\
		function loadObject() {
			$cms
				.getContent($state.params.contentId, {
					graphql: '{id,media_type,mime_type,metas{id,key,value}}'
				})
				.then(function(content) {
					var metas = content.metas;
					delete content.metas;
					var language = $mbLocal.getLanguage();
					_.forEach(metas, function(meta) {
						if (meta.key === 'language') {
							language = meta.value;
						}
					});
					content = _.assign(content, {
						language: language,
						url: '/api/v2/cms/contents/' + content.id + '/content'
					});
					// XXX: maso, 2020: this will be replaced with common editor api
					$window.open('/vw-studio/pages/' + content.id + '?' + $httpParamSerializer(content), '_blank');
					$editor.close();
				});
		}

		//------------------------------------------------------------------
		// init
		//------------------------------------------------------------------
		loadObject();
	},
}









