const hasDom = typeof window !== "undefined" &&
      !!window.document &&
      !!window.document.createElement;

const apiRoot = hasDom ?
      document.querySelector("meta[name=api-root]").content :
      global.apiRoot;

const pageData = hasDom && window.pageData;

export default {
  hasDom,
  apiRoot,
  pageData,
  get authToken() {
    return hasDom && localStorage.getItem("authToken");
  }
};
