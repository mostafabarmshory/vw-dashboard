

mblowfish.wizard(SDP_ASSET_CREATE_WIZARD, {
	title: 'New Asset',
	description: 'Creates new asset and store in a drive.',
	pages: [
		SDP_ASSET_CREATE_WIZARD + '#type',
		// switch media_type
		// case ebook -> #ebook-properties
		// case audio_book -> #audio_book-properties
		// case video_book -> #video_book-properties
		// case article -> #notsupport
		//------------------------------------------------------
		//1- Asset type pages
		//------------------------------------------------------
		// ebook
		SDP_ASSET_CREATE_WIZARD + '#ebook-properties',
		SDP_ASSET_CREATE_WIZARD + '#author',
		SDP_ASSET_CREATE_WIZARD + '#genre',
		SDP_ASSET_CREATE_WIZARD + '#publisher',
		SDP_ASSET_CREATE_WIZARD + '#tags', // -> #file
		
		/*
		NOTE: to add an asset type pages, puth the tags as the 
		latest one. The tag page jump to the file page and 
		finish the wizard.
		*/
		//------------------------------------------------------
		//3- general pages
		//------------------------------------------------------
		SDP_ASSET_CREATE_WIZARD + '#notsupport', // -> X
		// sequence
		SDP_ASSET_CREATE_WIZARD + '#file',
		SDP_ASSET_CREATE_WIZARD + '#market',
	],

	/*
	Validate data on changes
	*/
	onChange: function() {
		'ngInject';
		// TODO:
	},
	/*
	Check if it is possible to finish
	*/
	canFinish: function($wizard) {
		'ngInject';
		switch ($wizard.data.media_type) {
			case 'ebook':
				return true;
			default:
				return false;
		}
	},
	/*
	Perform final job
	*/
	performFinish: function($wizard, $mbActions) {
		'ngInject';
		/*
		Sets following fields:
		- path
		- file_name
		- size
		- mime_type
		- drive_id
		 */
		function setFile(data, source) {
			data.path = source.path;
			data.file_name = source.file_name;
			data.size = source.size;
			data.mime_type = source.mime_type;
			data.drive_id = source.drive.id;
		}

		/*
		Sets marketing fields
		
		- price
		- state
		- parent_id
		- owner_id
		*/
		function setMarketingData(data, source) {
			data.price = source.price;
			data.state = source.state;
			data.parent_id = source.parent ? source.parent.id : 0;
			data.owner_id = source.owner ? source.owner.id : 0;
		}

		/*
		Fields:
		
		- title -> title
		- abstract -> description
		- cover -> cover
		
		Metas:
		
		- isbn
		- edition
		- date_published
		- pages
		- language
		- age_range
		
		categories:
		
		- publisher
		- author
		- genre
		
		 */
		function setEbookData(data, source) {
			data.title = source.title;
			data.description = source.abstract;
			data.cover = source.cover;
			data.metadata = [{
				key: 'isbn',
				value: source.isbn || '-'
			}, {
				key: 'edition',
				value: source.edition || '-'
			}, {
				key: 'date_published',
				value: source.date_published || '2020-01-01 00:00:00'
			}, {
				key: 'pages',
				value: source.pages || 10
			}, {
				key: 'language',
				value: source.language || 'en'
			}, {
				key: 'age_range',
				value: source.age_range || 'all'
			}];
			// - categories
			data.categories = _.concat(
				data.categories,
				source.publishers || [],
				source.authors || [],
				source.genres || []
			);
		}

		/*
		Set tags
		- keywords -> tags
		*/
		function setTags(data, source) {
			data.tags = source.tags || [];
		}

		var data = {
			metadata: [],
			categories: [],
			tags: []
		};
		setFile(data, $wizard.data);
		setMarketingData(data, $wizard.data);
		setTags(data, $wizard.data);
		data.media_type = $wizard.data.media_type;
		switch ($wizard.data.media_type) {
			case 'ebook':
				setEbookData(data, $wizard.data);
				break;
			default:
				throw {
					code: 12,
					message: 'Not supported asset type:' + $wizard.data.media_type,
				};
		}
		return $mbActions.exec(SDP_ASSETS_CREATE_ACTION, {
			values: [data]
		});
	},
});


