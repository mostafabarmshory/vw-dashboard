const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



/**
 * Config
 * Reference: http://webpack.github.io/docs/configuration.html
 * This is the object where all configuration gets set
 */
module.exports = {
	bail: true,

	/**
	 * Entry
	 * Reference: http://webpack.github.io/docs/configuration.html#entry
	 * Should be an empty object if it's generating a test build
	 * Karma will set this when it's a test build
	 */
	entry: {
		app: './src/app.js',
	},

	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 * List: http://webpack.github.io/docs/list-of-plugins.html
	 */
	plugins: [
		require('autoprefixer'),
		// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Production',
			template: __dirname + '/src/app.html.tmplate',
			minify: {
				removeComments: false,
				collapseWhitespace: false
			}
		}),
		//		new webpack.LoaderOptionsPlugin({
		//			test: /\.scss$/i,
		//			options: {
		//				postcss: {
		//					plugins: [autoprefixer]
		//				}
		//			}
		//		}),
	],

	/**
	 * Output
	 * Reference: http://webpack.github.io/docs/configuration.html#output
	 * Should be an empty object if it's generating a test build
	 * Karma will handle setting it up for you when it's a test build
	 */
	output: {
		// Absolute output directory
		path: __dirname + '/dist',

		// Output path from the view of the page
		// Uses webpack-dev-server in development
		publicPath: './',

		// Filename for entry points
		// Only adds hash in build mode
		filename: '[name].[fullhash].js',

		// Filename for non-entry points
		// Only adds hash in build mode
		chunkFilename: '[name].[fullhash].js'
	},


	/**
	 * Loaders
	 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
	 * List: http://webpack.github.io/docs/list-of-loaders.html
	 * This handles most of the magic responsible for converting modules
	 */
	module: {
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
			//			exclude: /node_modules/,
			exclude: {
				and: [/node_modules/], // Exclude libraries in node_modules ...
				not: [
					// Except for a few of them that needs to be transpiled because they use modern syntax
					/mblowfish/,
				]
			},
			use: [
				{
					loader: 'babel-loader',
					options: {
						//						babelrc: false,
						//						cacheDirectory: true,
						//						configFile: './babel.config.json',
						rootMode: "upward",
						babelrcRoots: [
							".",
							"./node_modules/*",
						]
					},
				}
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
			// Reference: https://webpack.js.org/loaders/postcss-loader/
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
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								"postcss-preset-env"
							],
						},
					},
				}
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
	}
};