import Feq from "feq";
import {authToken} from "./globals";

const jsonFeq = new Feq({
  requestProcessors: [
    function(request) {
      request.headers["Content-Type"] = "application/json";

      if (authToken) {
        request.headers["Authorization"] = `Bearer ${authToken}`;
      }
    }
  ]
});

export default jsonFeq;
