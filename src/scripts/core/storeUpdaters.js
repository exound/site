import R from "ramda";
import store from "./store";

export function append(mount, item) {
  return mount.value = R.append(
    item,
    mount.value,
  );
}

export function prepend(mount, item) {
  return mount.value = R.prepend(
    item,
    mount.value,
  );
};

export function modify(mount, item) {
  return mount.value = item;
};
