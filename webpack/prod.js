const config = require("./base")
    , ExtractTextPlugin = require("extract-text-webpack-plugin");

config.plugins.push(new ExtractTextPlugin("main.css", {allChunks: true}));

config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract("style", "css")
});

module.exports = config;
