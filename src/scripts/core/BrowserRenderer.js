import R from "ramda";
import flyd from "flyd";
import React from "react";
import {Router} from "react-router";
import {render} from "react-dom";

import title from "./title";
import routes from "./routes";
import store from "./store";
import resolveData from "./resolveData";
import fetchCurrentUser from "./fetchCurrentUser";
import createElement from "./createElement";
import track from "./track";
import {gaTrackId} from "./globals";

export default class BrowserRenderer {
  static run({data, history}) {
    return new BrowserRenderer({data, history}).run();
  }

  constructor({data, history}) {
    store.data = data;
    this.history = history;

    this.history.listen(location => {
      resolveData(location).then((data) => {
        if (data.serverRender) delete window.__data__;

        store.data = data;

        return data;
      }).then(fetchCurrentUser).then((data) => {
        track("create", {
          trackingId: gaTrackId,
          cookieDomain: "auto",
          userId: (data.user && data.user.nick) || "guest"
        });

        const url = window.location.href;

        track("send", {
          hitType: "pageview",
          location: url,
          page: data.route,
          title: title(data.title)
        });
      });
    });

    flyd.on(this.onStoreUpdate, store.stream$);
  }

  onStoreUpdate = (appState) => {
    document.title = title(appState.data && appState.data.title);
    this.run();
  };

  run() {
    const emptyState = R.keys(store.state).length
        , props = {createElement, history: this.history, routes};

    return render(<Router {...props} />, document.querySelector("#app"));
  }
};
