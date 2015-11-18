import jsonFeq from "./jsonFeq";
import store from "./store";
import apiPath from "./apiPath";

const userMount = store.makeDataMount(["user"]);

export default function fetchCurrentUser(data) {
  if (data.serverRender && data.user.guest) {
    jsonFeq.get(apiPath("users/current")).then(({body, status}) => {
      if (status < 400) {
        userMount.value = body;
      }
    });
  }

  return data;
};
