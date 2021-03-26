const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',


	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	devtool: 'inline-source-map',

	//
	// Dev server configuration
	// Reference: https://webpack.js.org/configuration/dev-server/
	devServer: {
		contentBase: [
			path.join(__dirname, 'dist'),
			path.join(__dirname, 'spas')
		],
		compress: true,
		port: 9001,
		writeToDisk: true,
		proxy: {
			'/api': {
				target: 'http://viraweb123.ir',
				secure: false,
				changeOrigin: true
			}
		},
	}

});