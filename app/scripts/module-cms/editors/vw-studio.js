mblowfish.editor('/cms/vw-studio-editor/:contentId', {
	title: 'VW Studio',
	icon: 'text',
	template: '<iframe></iframe>',
	controllerAs: 'ctrl',
	supportedMimetypes: [
		'application/weburger+json'
	],
	controller: function($state, $element, $cms, $httpParamSerializer, $mbLocal) {
		'ngInject';
		//------------------------------------------------------------------
		// Functions
		//------------------------------------------------------------------\
		function loadObject() {
			$cms.getContent($state.params.contentId,{
				graphql: '{id,media_type,mime_type,metas{id,key,value}}'
			})
				.then(function(content) {
					var metas = content.metas;
					delete content.metas;
					var language = $mbLocal.getLanguage();
					_.forEach(metas, function(meta){
						if(meta.key === 'language'){
							language = meta.value;
						}
					});
					content = _.assign(content, {
						language: language,
						url: '/api/v2/cms/contents/' + content.id + '/content'
					});
					$element.find('iframe')
						// XXX: maso, 2020: this will be replaced with common editor api
						.attr('src', '/vw-studio/pages/'+content.id+'?' + $httpParamSerializer(content))
						.css({
							'flex-grow': 1,
							'border': 'none',
							'overflow': 'hidden'
						});
				});
		}

		//------------------------------------------------------------------
		// init
		//------------------------------------------------------------------
		loadObject();
	},
});









