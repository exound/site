import R from "ramda";
import React from "react";

export default function populateData(data) {
  return function(Component, props) {
    return <Component {...R.merge(props, {data})} />;
  };
};
