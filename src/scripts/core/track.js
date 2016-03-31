import {hasDom, userDimension} from "./globals";
import store from "./store";

export default function track(cmd, obj) {
  if (hasDom) {
    obj[userDimension] = JSON.stringify({user: store.userMount.value.nick || "guest"});
    return ga(cmd, obj);
  }
};
