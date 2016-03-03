module.exports = function(options, ng2workspace) {
  var cloneDeep = require('lodash.clonedeep');
  var karmaConfig = require('./config/karma.default.js');

  var webpackConfig = karmaConfig.webpack =
      cloneDeep(ng2workspace.get('webpack').webpackConfig);

  adjustKarmaOptions(karmaConfig, options);
  adjustWebpackConfig(webpackConfig, ng2workspace);

  /**
   * @type INg2WorkspaceAddon
   */
  return {
    export: {
      karmaConfig: karmaConfig
    },

    recipes: ['karma.task.js']
  }
};

function adjustKarmaOptions(karmaConfig, userOptions) {
  var configurable = ['browsers', 'logLevel'];

  configurable.forEach(function(option) {
    karmaConfig[option] = userOptions[option] || karmaConfig[option];
  });
}

function adjustWebpackConfig(config, ng2workspace) {
  config.debug = false;
  config.devtool = 'inline-sourcemap';

  config.module.preLoaders.push({
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [
      ng2workspace.util.toAbsolute('node_modules/rxjs')
    ]
  });

  config.module.postLoaders.push({
    test: /\.(js|ts|cs)$/,
    include: ng2workspace.util.toAbsolute('src'),
    loader: 'istanbul-instrumenter-loader',
    exclude: [
      /\.(e2e|spec)\.(js|ts|cs)$/,
      /node_modules/
    ]
  });

  // drop any sort of *promise-loader* during testing
  config.module.loaders.forEach(function(loaderObj) {
    loaderObj.loaders = (loaderObj.loaders || [loaderObj.loader])
        .reduce(function(memo, loader) {
          return memo.concat(loader.split('!'));
        }, []);

    loaderObj.loaders = loaderObj.loaders.filter(function(loader) {
      return !!loader && loader.indexOf('promise-loader') === -1;
    });

    delete loaderObj.loader;
  });

  config.stats = { colors: true, reasons: true };
}