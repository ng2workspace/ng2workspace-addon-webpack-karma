var ng2workspace = require('ng2workspace').ng2workspace;
var spec_entry = ng2workspace.config.spec_entry;

var karmaConfig = module.exports = {
  basePath: '',

  frameworks: ['jasmine'],

  exclude: [ ],

  files: [ { pattern: spec_entry, watched: false } ],

  preprocessors: { },

  // webpack: // programmatically set by the module's main

  coverageReporter: {
    dir : 'coverage/',
    reporters: [
      { type: 'text-summary' },
      { type: 'json' },
      { type: 'html' }
    ]
  },

  webpackServer: { noInfo: true },

  reporters: [ 'mocha', 'coverage' ],

  port: 9876,

  colors: true,

  logLevel: 'INFO',

  autoWatch: false,

  browsers: [
    // 'Chrome',
    'PhantomJS'
  ],

  singleRun: true
};

karmaConfig.preprocessors[spec_entry] = ['coverage', 'webpack', 'sourcemap'];