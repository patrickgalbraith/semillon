var path = require('path')
var webpack = require('webpack')

let config = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // Define environment variables here that need to be accessed by the client
        NODE_ENV:     JSON.stringify(process.env.NODE_ENV),
        API_ROOT:     JSON.stringify(process.env.API_ROOT),
        SITE_NAME:    JSON.stringify(process.env.SITE_NAME),
        SITE_TAGLINE: JSON.stringify(process.env.SITE_TAGLINE),
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react'],
        }
      }
    ]
  }
}

// Hot loader
if (process.env.HOT) {
  config.module.loaders[0].query.env = {
    development: {
      plugins: ["react-transform"],
      extra: {
        "react-transform": {
          transforms: [{
            transform: "react-transform-hmr",
            imports: ["react"],
            locals: ["module"]
          }]
        }
      }
    }
  }
}

// Production config
if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NoErrorsPlugin())
}

module.exports = config;