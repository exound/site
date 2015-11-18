import {hasDom} from "./globals";

const avatar = hasDom ?
      require("../../images/guest_avatar.png") :
      "/images/guest_avatar.png";
      
const guest = {
  get guest() {
    return !this.id;
  },

  avatar
};

export default guest;
