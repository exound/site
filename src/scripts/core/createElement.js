import R from "ramda";
import React from "react";
import store from "./store";

export default function createElement(Component, props) {
  return <Component {...R.merge(props, {appState: store.stream$()})} />;
}
