const config = require("./base")
    , fs = require("fs")
    , webpack = require("webpack")
    , path = require("path")
    , ExtractTextPlugin = require("extract-text-webpack-plugin");

const dist = path.join(__dirname, "..", "dist");

config.target = "web";

config.plugins.push(
  new ExtractTextPlugin("main.css", {allChunks: true}),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);

config.module.loaders.push({
  test: /\.css$/,
  exclude: /(tinymce|article-content)/,
  loader: ExtractTextPlugin.extract("style", "css!cssnext")
});

config.module.loaders.push({
  test: /\.html$/,
  loader: "null"
})

const nodeModules = {};

fs.readdirSync("node_modules").filter(function(x) {
  return [".bin"].indexOf(x) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = "commonjs " + mod;
});

module.exports = [
  config,
  {
    entry: path.join(__dirname, "server.js"),

    externals: nodeModules,

    output: {
      path: path.join(dist, "server"),
      filename: "index.js"
    },

    target: "node",

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
          test: /\.js$/,
	        exclude: /node_modules/,
          loader: "babel",
          query: {
            optional: ["runtime", "es7.decorators", "es7.classProperties"]
          }
        },
        {
          test: /\.json$/,
          loader: "json"
        }
      ]
    }
  }
];
