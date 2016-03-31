const hasDom = typeof window !== "undefined" &&
      !!window.document &&
      !!window.document.createElement;

const apiRoot = hasDom ?
      document.querySelector("meta[name=api-root]").content :
      global.apiRoot;

export default {
  gaTrackId: "UA-75482390-1",
  userDimension: "dimension4",
  hasDom,
  apiRoot,
  get pageData() {
    return hasDom && window.__data__;
  },
  get authToken() {
    return hasDom && localStorage.getItem("authToken");
  }
};
