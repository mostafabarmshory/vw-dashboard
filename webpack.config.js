
// Modules
//var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
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
	 * PostCSS
	 * Reference: https://github.com/postcss/autoprefixer-core
	 * Add vendor prefixes to your css
	 */
	// NOTE: This is now handled in the `postcss.config.js`
	//       webpack2 has some issues, making the config file necessary



	return config;
}
