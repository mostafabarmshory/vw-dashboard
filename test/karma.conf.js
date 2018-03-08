// Karma configuration
// Generated on 2016-05-30

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/d3/d3.js',
      'bower_components/nvd3/build/nv.d3.js',
      'bower_components/angular-nvd3/dist/angular-nvd3.js',
      'bower_components/moment/moment.js',
      'bower_components/moment-jalaali/build/moment-jalaali.js',
      'bower_components/angular-pluf/dist/angular-pluf.js',
      'bower_components/seen-core/dist/seen-core.js',
      'bower_components/seen-tenant/dist/seen-tenant.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/tinycolor/tinycolor.js',
      'bower_components/md-color-picker/dist/mdColorPicker.min.js',
      'bower_components/tinymce/tinymce.js',
      'bower_components/angular-ui-tinymce/src/tinymce.js',
      'bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
      'bower_components/angular-material-expansion-panel/dist/md-expansion-panel.js',
      'bower_components/angular-material-icons/angular-material-icons.min.js',
      'bower_components/weakmap-polyfill/weakmap-polyfill.js',
      'bower_components/numbro/numbro.js',
      'bower_components/pikaday/pikaday.js',
      'bower_components/zeroclipboard/dist/ZeroClipboard.js',
      'bower_components/handsontable/dist/handsontable.js',
      'bower_components/ngHandsontable/dist/ngHandsontable.js',
      'bower_components/am-wb-core/dist/am-wb-core.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/am-wb-common/dist/am-wb-common.js',
      'bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.js',
      'bower_components/angular-uuid/uuid.min.js',
      'bower_components/am-wb-seen-core/dist/am-wb-seen-core.js',
      'bower_components/am-wb-seen-monitors/dist/am-wb-seen-monitors.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/ng-appcache/dist/appcache.js',
      'bower_components/angular-recaptcha/release/angular-recaptcha.js',
      'bower_components/blob-polyfill/Blob.js',
      'bower_components/file-saver.js/FileSaver.js',
      'bower_components/angular-file-saver/dist/angular-file-saver.bundle.js',
      'bower_components/angular-material-persian-datepicker/dist/datePicker.min.js',
      'bower_components/angular-material-dashboard/dist/angular-material-dashboard.js',
      'bower_components/angular-material-dashboard-tenant/dist/angular-material-dashboard-tenant.js',
      'bower_components/angular-material-dashboard-cms/dist/angular-material-dashboard-cms.js',
      'bower_components/angular-material-dashboard-spa/dist/angular-material-dashboard-spa.js',
      'bower_components/angular-material-dashboard-bank/dist/angular-material-dashboard-bank.js',
      'bower_components/angular-material-dashboard-account/dist/angular-material-dashboard-account.js',
      'bower_components/angular-material-dashboard-user/dist/angular-material-dashboard-user.js',
      'bower_components/angular-material-dashboard-seo/dist/angular-material-dashboard-seo.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
