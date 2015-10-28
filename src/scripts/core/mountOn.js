import {Mount} from "lmount";
import store from "./store";

export default function mountOn(path) {
  return Mount.on({path, data: store});
}
