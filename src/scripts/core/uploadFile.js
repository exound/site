import feq from "./feq";
import apiPath from "./apiPath";

export default function uploadFile(file, info = {}) {
  const data = new FormData();

  data.append("file", file);

  for (const key in info) {
    data.append(key, info[key]);
  }

  return feq.post(apiPath("uploads"), data);
};
