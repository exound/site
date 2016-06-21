import {hasDom, userDimension} from "./globals";
import store from "./store";

export default function track(cmd, obj) {
  const nick = store.userMount.value ? store.userMount.value.nick : "guest";

  if (hasDom) {
    obj[userDimension] = JSON.stringify({user: nick});
    return ga(cmd, obj);
  }
};
