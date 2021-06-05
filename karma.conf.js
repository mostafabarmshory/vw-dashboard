module.exports = (config) => {
	config.set({
		// ... normal karma configuration
		singleRun: true,
		failOnEmptyTestSuite: false,
		logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG

		// make sure to include webpack as a framework
		frameworks: ['jasmine', 'webpack'],


		files: [
			// all files ending in ".test.js"
			// !!! use watched: false as we use webpacks watch
			{
				pattern: './src/**/*.spec.js',
				watched: true
			}
		],

		preprocessors: {
			'src/**/*.js': ['webpack', 'coverage']
		},

		webpack: {
			// karma watches the test entry points
			// Do NOT specify the entry option
			// webpack watches dependencies

			// webpack configuration
		},
		//list of browsers to launch and capture
		browsers: [
			// 'Chromium',
			'ChromiumHeadless',
			'FirefoxHeadless',
		],
		//list of reporters to use
		reporters: [
			//			'mocha',
			//			'kjhtml',
			//			'dots',
			'progress',
			'coverage'
			//			'spec'
		],

		// optionally, configure the reporter
		coverageReporter: {
			dir: 'coverage/',
			reporters: [
				// reporters not supporting the `file` property
				{ type: 'html', subdir: 'html' },
				{ type: 'lcov', subdir: 'lcov' },
				// reporters supporting the `file` property, use `subdir` to directly
				// output them in the `dir` directory
				{ type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
				{ type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
				{ type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
				{ type: 'text', subdir: '.', file: 'text.txt' },
				{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
			]
		}
	});
}

