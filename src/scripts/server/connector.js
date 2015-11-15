import fs from "fs";
import R from "ramda";
import React from "react";
import path from "path";
import koa from "koa";
import Handlebars from "handlebars";
import createLocation from "history/lib/createLocation";
import {RoutingContext, match} from "react-router";
import {renderToString} from "react-dom/server";
import serve from "koa-static";
import {Data} from "lmount";

import {plain as routes} from "../core/routes";
import resolveData from "../core/resolveData";
import store from "../core/store";
import ServerRenderer from "./ServerRenderer";
import createElement from "../core/createElement";
import title from "../core/title";

const connector = koa();

connector.use(serve(path.join(__dirname, "..", "..", "..", "dist")));

connector.use(function *(next) {
  if (this.render) return yield next;

  const templatePath = path.join(__dirname, "..", "..", "index.html");
  const cache = {};

  function readFile() {
    return function(callback) {
      fs.readFile(templatePath, callback);
    }
  }

  const source = (yield readFile(templatePath)).toString();

  this.renderTemplate = function (locals) {
    return function (callback) {
      if (!cache.template) {
        cache.template = Handlebars.compile(source);
      }

      callback(null, cache.template(locals));
    }
  }

  this.render = function* (locals) {
    this.type = "html";
    this.body = yield this.renderTemplate(locals);
  };

  yield next;
});

connector.use(function *(next) {
  if (typeof this.match !== "function") {
    this.match = (location) => {
      return new Promise(function(resolve, reject) {
        match({routes, location}, (error, redirect, props) => {
          if (error) reject(error);
          else resolve({redirect, props});
        });
      });
    }
  }

  const location = createLocation(this.request.url)
      , {redirect, props} = yield this.match(location.pathname);

  if (!props) return yield next;

  if (redirect) {
    this.status = 301;
    return this.redirect(`${redirect.pathname}${redirect.search}`);
  }

  const resolver = resolveData(location);

  if (!resolver) return yield next;

  const data = yield resolver

  store.data = data;

  const app = ServerRenderer.run({data, renderProps: props});

  yield this.render({
    app,
    apiRoot,
    data: JSON.stringify(data),
    title: title(data.title)
  });

  yield next;
});

export default connector;
