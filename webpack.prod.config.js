var webpack = require('webpack');
var path = require('path');

var jsSourcePath = __dirname + "/static/js/entries/";

module.exports = {
  entry: {
    index: jsSourcePath + "index.js",
    edit: jsSourcePath + "edit.js",
    moderate: jsSourcePath + "moderate.js",
    gardening: jsSourcePath + "gardening.js",
    garden: jsSourcePath + "garden.js"
  },

  output: {
    filename: "[name].min.js",
    path: path.join(__dirname, "static/dist"),
  },

  resolve: {
    extensions: ['','.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("plantator.min.js"),
    new webpack.BannerPlugin("Copyright Plantator"),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __DEVTOOLS__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
}
