const config = require("./base")
    , webpack = require("webpack")
    , path = require("path")
    , fs = require("fs")
    , IS_LOCAL = fs.existsSync(path.join(__dirname, "..", "_local"))
    , apiRoot = IS_LOCAL ? "http://127.0.0.1:3000" : "http://api.exound.com"
    , ExtractTextPlugin = require("extract-text-webpack-plugin");

config.devtool = "source-map";

config.output.devtoolLineToLine = {
  test: /\.js$/,
  exclude: /node_modules/
};

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new ExtractTextPlugin("index.html"));

config.devServer = {
  hot: true,
  historyApiFallback: true,
  inline: true
};

config.module.loaders.push({
  test: /index\.html$/,
  loader: ExtractTextPlugin.extract(
    "template-html?engine=handlebars&data=false&inlineStyle=true&apiRoot=" + apiRoot
  ),
})

config.module.loaders.push({
  test: /\.css$/,
  exclude: /(tinymce|article-content)/,
  loaders: ["style", "css", "cssnext"]
});

config.module.loaders.push({
  test: /\.(png|jpg|jpeg|gif|bmp)$/,
  exclude: /node_modules/,
  loader: "file"
});

module.exports = config;
