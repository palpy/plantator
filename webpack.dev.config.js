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
    	filename: "[name].js",
    	path: path.join(__dirname, "dist"),
  	},

    resolve: {
      extensions: ['','.js', '.jsx']
    },

  	module: {
  		loaders: [
  		{
      		test: /\.(js|jsx)$/,
      		exclude: /node_modules/,
      		loader: "babel-loader"
    	}
  		],
	  },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin("plantator.js"),
      new webpack.BannerPlugin("Copyright Plantator"),
      new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: "/",
        colors: true,
        historyApiFallback: true,
        lazy: false,
        info: false,
        quiet: false,
    }
}
