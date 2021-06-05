const common = require('./webpack.common.js');
const package = require('./package.json');
const merge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const GenerateJsonPlugin = require("generate-json-webpack-plugin")


delete package.scripts;
delete package.devDependencies;
delete package.dependencies;
delete package.peerDependencies;
delete package.peerDependenciesMeta;
delete package.peerDependenciesMeta;
delete package.optionalDependencies;
delete package.bundledDependencies;
delete package.resolutions;
delete package.engines;
delete package.private;
delete package.publishConfig;

module.exports = merge(common, {
	mode: 'production',


	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 * List: http://webpack.github.io/docs/list-of-plugins.html
	 */
	plugins: [
		//			// Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
		//			// Only emit files when there are no errors
		////			new webpack.NoErrorsPlugin(),
		//
		//			// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
		//			// Minify all javascript, switch loaders to minimizing mode
		////			new webpack.optimize.UglifyJsPlugin(),
		// Copy assets from the public folder
		// Reference: https://github.com/kevlened/copy-webpack-plugin
		//			new CopyPlugin([{
		//				from: __dirname + '/src/public'
		//			}])
		new GenerateJsonPlugin('spa.json', package),
		new ZipPlugin({
			// OPTIONAL: defaults to the Webpack output path (above)
			// can be relative (to Webpack output path) or absolute
			//			path: '.',

			// OPTIONAL: defaults to the Webpack output filename (above) or,
			// if not present, the basename of the path
			filename: 'vw-dashboard.zip',

			// OPTIONAL: defaults to 'zip'
			// the file extension to use instead of 'zip'
			extension: 'zip',

			// OPTIONAL: defaults to the empty string
			// the prefix for the files included in the zip file
			// pathPrefix: 'relative/path',

			// OPTIONAL: defaults to the identity function
			// a function mapping asset paths to new paths
			//			pathMapper: function(assetPath) {
			//				// put all pngs in an `images` subdir
			//				if (assetPath.endsWith('.png'))
			//					return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
			//				return assetPath;
			//			},

			// OPTIONAL: defaults to including everything
			// can be a string, a RegExp, or an array of strings and RegExps
			//			include: [/\.js$/],

			// OPTIONAL: defaults to excluding nothing
			// can be a string, a RegExp, or an array of strings and RegExps
			// if a file matches both include and exclude, exclude takes precedence
			//			exclude: [/\.png$/, /\.html$/],

			// yazl Options

			// OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
			fileOptions: {
				mtime: new Date(),
				mode: 0o100664,
				compress: true,
			},

			// OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
			zipOptions: {
				forceZip64Format: false,
			},
		})
	],


	/*
	 * Optimize the output code
	 */
	optimization: {
		splitChunks: {
			chunks: 'all',
			//			maxSize: 244*1024
		},
	},


	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	devtool: 'source-map',
});