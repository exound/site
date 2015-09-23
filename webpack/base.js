const path = require("path")
    , webpack = require("webpack")
    , ExtractTextPlugin = require("extract-text-webpack-plugin");

const src = path.join(__dirname, "..", "src")
    , dist = path.join(__dirname, "..", "dist");

const apiRoot = "http://127.0.0.1:3000";

module.exports = {
  entry: path.join(__dirname, "client.js"),
  output: {
    path: dist,
    filename: "main.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
	      exclude: /node_modules/,
	      loader: "eslint"
      }
    ],

    loaders: [
      {
        test: /index\.html$/,
        loader: ExtractTextPlugin.extract(
          "template-html?engine=handlebars&inlineStyle=true&apiRoot=" + apiRoot
        ),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          optional: ["runtime"]
        }
      }
    ],
  }
};
