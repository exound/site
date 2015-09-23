const config = require("./base")
    , ExtractTextPlugin = require("extract-text-webpack-plugin");

config.devtool = "source-map";

config.output.devtoolLineToLine = {
  test: /\.js$/,
  exclude: /node_modules/
};

config.devServer = {
  hot: true,
  historyApiFallback: true,
  inline: true
};

config.module.loaders.push({
  test: /\.css$/,
  loaders: ["style", "css"]
});

config.plugins.push(new ExtractTextPlugin("index.html"));

module.exports = config;
