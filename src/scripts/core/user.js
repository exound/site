import {hasDom} from "./globals";

const avatar = hasDom ?
      require("../../images/guest_avatar.png") :
      "/images/guest_avatar.png";

class User {
  constructor(props) {
    for (const name in props) {
      if (name === "avatar") continue;
      this[name] = props[name];
    }

    this.__avatar__ = props.avatar;
  }

  get avatar() {
    return this.__avatar__ || avatar;
  }

  get guest() {
    return !this.id;
  }
}

export default function user(props) {
  return new User(props || {});
};
