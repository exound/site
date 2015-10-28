import Feq from "feq";
import {authToken} from "./globals";

const feq = new Feq({
  requestProcessors: [
    function(request) {
      if (authToken) {
        request.headers["Authorization"] = `Bearer ${authToken}`;
      }
    }
  ]
});

export default feq;
