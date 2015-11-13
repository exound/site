const config = require("./base")
    , ExtractTextPlugin = require("extract-text-webpack-plugin");

config.plugins.push(new ExtractTextPlugin("main.css", {allChunks: true}));

config.module.loaders.push({
  test: /\.css$/,
  exclude: /(tinymce|article-content)/,
  loader: ExtractTextPlugin.extract("style", "css!cssnext")
});

config.module.loaders.push({
  test: /\.html$/,
  loader: "null"
})

config.module.loaders.push({
  test: /\.(png|jpg|jpeg|gif|bmp)$/,
  loader: "file?name=images/[name].[ext]"
});

module.exports = config;
