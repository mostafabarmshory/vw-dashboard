const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/app.html',
			inject: 'body',
			favicon: 'src/favicon.ico',
			minify: {
				collapseWhitespace: isProd,
				removeComments: false
			}
		}),

		// Reference: https://github.com/webpack/extract-text-webpack-plugin
		// Extract css files
		// Disabled when in test mode or not in build mode
		// new ExtractTextPlugin({ filename: 'css/[name].css', disable: !isProd, allChunks: true })
		//			new MiniCssExtractPlugin()
	],
	
	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	devtool: 'inline-source-map',
	
	// ISTANBUL LOADER
	// https://github.com/deepsweet/istanbul-instrumenter-loader
	// Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
	// Skips node_modules and files that end with .spec.js
	rules: [{
		enforce: 'pre',
		test: /\.js$/,
		exclude: [
			/node_modules/,
			/\.spec\.js$/
		],
		loader: 'istanbul-instrumenter-loader',
		query: {
			esModules: true
		}
	}],
	
	//
	// Dev server configuration
	// Reference: https://webpack.js.org/configuration/dev-server/
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
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
