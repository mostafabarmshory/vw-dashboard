const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

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