var ng2workspace = require('ng2workspace').ng2workspace;
var karmaConfig = ng2workspace.get('webpack-karma').karmaConfig;

module.exports = {
  formula: {
    '#default': 'single',

    karmaConfig: karmaConfig,

    ':single': {
      '^karmaConfig': {
        autoWatch: false,
        singleRun: true
      }
    },

    ':watch': {
      '^karmaConfig': {
        autoWatch: true,
        singleRun: false
      }
    }
  },

  action: function(done) {
    var karmaConfig = this.config.karmaConfig;
    var karma = require('karma');

    var server = new karma.Server(karmaConfig, function() {
      if(done) {
        done();
        done = null;
      }
    });

    server.start();
  }
};