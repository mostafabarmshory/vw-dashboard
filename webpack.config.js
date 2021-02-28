'use strict';
var path = require('path');

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {

	/*
	 * At the first step, we decide the build mode is develop or not
	 */
	//argv.mode === 'production' | 'none'
	var isTest = false;
	var isProd = true;
	//argv.mode === 'production'
	if (argv.mode === 'development') {
		//		isTest = true;
		isProd = false;
	}


	/**
	 * Config
	 * Reference: http://webpack.github.io/docs/configuration.html
	 * This is the object where all configuration gets set
	 */
	var config = {};

	/**
	 * Entry
	 * Reference: http://webpack.github.io/docs/configuration.html#entry
	 * Should be an empty object if it's generating a test build
	 * Karma will set this when it's a test build
	 */
	config.entry = isTest ? void 0 : {
		app: './src/app.js'
	};

	/**
	 * Output
	 * Reference: http://webpack.github.io/docs/configuration.html#output
	 * Should be an empty object if it's generating a test build
	 * Karma will handle setting it up for you when it's a test build
	 */
	config.output = isTest ? {} : {
		// Absolute output directory
		path: __dirname + '/dist',

		// Output path from the view of the page
		// Uses webpack-dev-server in development
		publicPath: './',

		// Filename for entry points
		// Only adds hash in build mode
		filename: '[name].[hash].js',

		// Filename for non-entry points
		// Only adds hash in build mode
		chunkFilename: '[name].[hash].js'
	};

	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	if (isTest) {
		config.devtool = 'inline-source-map';
	} else if (isProd) {
		config.devtool = 'source-map';
	} else {
		config.devtool = 'eval-source-map';
	}

	/**
	 * Loaders
	 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
	 * List: http://webpack.github.io/docs/list-of-loaders.html
	 * This handles most of the magic responsible for converting modules
	 */

	// Initialize module
	config.module = {
		rules: [{
			// Expose loader
			// Reference: https://github.com/webpack-contrib/expose-loader
			// To load jquery in all part of project
			test: require.resolve("jquery"),
			loader: "expose-loader",
			options: {
				exposes: ["$", "jQuery"],
			},
		},
		{
			// JS LOADER
			// Reference: https://github.com/babel/babel-loader
			// Transpile .js files using babel-loader
			// Compiles ES6 and ES7 into ES5 code
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				{ loader: 'babel-loader' }
			],
		}, {
			// CSS LOADER
			//
			// Reference: https://github.com/webpack/style-loader
			// Allow loading style
			//
			// Reference: https://github.com/webpack/css-loader
			// Allow loading css through js
			//
			// Reference: https://github.com/webpack/postcss-loader
			// Postprocess your css with PostCSS plugins
			test: /\.css$/,
			// Reference: https://github.com/webpack/extract-text-webpack-plugin
			// Extract css files in production builds
			//
			// Reference: https://github.com/webpack/style-loader
			// Use style-loader in development.

			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}, {
			// ASSET LOADER
			// Reference: https://github.com/webpack/file-loader
			// Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
			// Rename the file using the asset hash
			// Pass along the updated reference to your code
			// You can add here any file extension you want to get copied to your output
			test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
			use: ['file-loader']
		}, {
			// HTML LOADER
			// Reference: https://github.com/WearyMonkey/ngtemplate-loader
			// Reference: https://github.com/webpack/raw-loader
			// Allow loading html through js
			test: /\.html$/,
			exclude: path.resolve(__dirname, './src/app.html'),
			use: [
				{
					loader: path.resolve('webpack/ngtemplate-loader.js'),
					options: {
						// TODO: change th path to the root of the project __dirname
						relativeTo: '/home/maso/git',
						module: 'mblowfishApp',
					}
				},
				{ loader: 'html-loader' },
			]
		}]
	};

	// ISTANBUL LOADER
	// https://github.com/deepsweet/istanbul-instrumenter-loader
	// Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
	// Skips node_modules and files that end with .spec.js
	if (isTest) {
		config.module.rules.push({
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
		})
	}

	/**
	 * PostCSS
	 * Reference: https://github.com/postcss/autoprefixer-core
	 * Add vendor prefixes to your css
	 */
	// NOTE: This is now handled in the `postcss.config.js`
	//       webpack2 has some issues, making the config file necessary

	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 * List: http://webpack.github.io/docs/list-of-plugins.html
	 */
	config.plugins = [
		new CleanWebpackPlugin(),
		new webpack.LoaderOptionsPlugin({
			test: /\.scss$/i,
			options: {
				postcss: {
					plugins: [autoprefixer]
				}
			}
		}),
	];

	// Skip rendering app.html in test mode
	if (!isTest) {
		// Reference: https://github.com/ampedandwired/html-webpack-plugin
		// Render app.html
		config.plugins.push(
			new HtmlWebpackPlugin({
				template: 'src/app.html',
				inject: 'body',
				favicon: 'src/favicon.ico'
			}),

			// Reference: https://github.com/webpack/extract-text-webpack-plugin
			// Extract css files
			// Disabled when in test mode or not in build mode
			// new ExtractTextPlugin({ filename: 'css/[name].css', disable: !isProd, allChunks: true })
			//			new MiniCssExtractPlugin()
		)
	}

	// Add build specific plugins
	if (isProd) {
		config.plugins.push(
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
		)
	}

	//
	// Dev server configuration
	// Reference: https://webpack.js.org/configuration/dev-server/
	config.devServer = {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9001,
		writeToDisk: true,
		proxy: {
			'/api': {
				target: 'http://elbaan.com',
				secure: false,
				changeOrigin: true
			}
		},
	};


	return config;
}
