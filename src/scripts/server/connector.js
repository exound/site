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
import templateString from "raw!../../index.html";

const connector = koa();

connector.use(serve(path.join("dist", "client")));

connector.use(function *(next) {
  if (this.render) return yield next;

  const cache = {};

  this.renderTemplate = function (locals) {
    return function (callback) {
      if (!cache.template) {
        cache.template = Handlebars.compile(templateString);
      }

      callback(null, cache.template(locals));
    };
  };

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
    };
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

  const isManagePath = !!location.pathname.match(/^\/manage/);

  const data = !isManagePath && (yield resolver);

  if (data) store.data = data;

  const isNotFound = data && data.notfound;

  if (isNotFound) this.status = 404;

  const app = !isManagePath && ServerRenderer.run({
    data,
    renderProps: isNotFound ? (yield this.match("/notfound")).props : props
  });

  yield this.render({
    app,
    apiRoot,
    data: data ? JSON.stringify(data) : null,
    title: title(data.title)
  });

  yield next;
});

export default connector;
