const path = require("path")
    , webpack = require("webpack");

const src = path.join(__dirname, "..", "src")
    , dist = path.join(__dirname, "..", "dist");

module.exports = {
  entry: path.join(__dirname, "client.js"),

  output: {
    path: path.join(dist, "client"),
    publicPath: "/",
    filename: "main.js"
  },

  plugins: [],

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
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&prefix=fonts"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&prefix=fonts"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&prefix=fonts"
      }
    ],
  }
};
