import {apiRoot} from "./globals";
import R from "ramda";

export default function apiPath(path, queries = {}) {
  const baseUrl =  R.join("/", [apiRoot, /\/?(.*)+/.exec(path)[1]])
      , queryStr = R.compose(R.join("&"), R.map(R.join("=")), R.toPairs)(queries)
      , joint = baseUrl.match(/\?/) ? "&" : "?";

  return queryStr ? `${baseUrl}${joint}${queryStr}` : baseUrl;
};
