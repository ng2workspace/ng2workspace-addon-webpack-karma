Karma addon for [ng2workspace](https://github.com/ng2workspace/ng2workspace)
and [ng2workspace-addon-webpack](https://github.com/ng2workspace/ng2workspace-addon-webpack).

Must be added after every other webpack addon.

The karma configuration options `browsers` and `logLevel` may be passed
as options to `ng2workspace#add` to override the default options.

The entire Karma configuration is also exported as `karmaConfig` and 
can be accessed via `ng2workspace.get('webpack-karma').karmaConfig`.