import Feq from "feq";
import {hasDom, authToken} from "./globals";

const feq = new Feq({
  requestProcessors: [
    function(request) {
      if (authToken) {
        request.headers["Authorization"] = `Bearer ${authToken}`;
      }
    }
  ],
  responseProcessors: [
    function({body, status}) {
      const tokenInvalid = body.errors &&
            body.errors.auth_token === "invalid";

      if (hasDom && tokenInvalid && status === 401) {
        localStorage.removeItem("authToken");
        window.location.replace("/");
      }
    }
  ]
});

export default feq;
