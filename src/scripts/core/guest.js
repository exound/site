import {hasDom} from "./globals";

const avatar = hasDom ?
      require("../../images/guest_avatar.png") :
      "/images/guest_avatar.png";
      
const guest = {
  guest: true,
  avatar
};

export default guest;
