const hasDom = typeof window !== "undefined" &&
      !!window.document &&
      !!window.document.createElement;

const apiRoot = hasDom ?
      document.querySelector("meta[name=api-root]").content :
      global.apiRoot;

const pageData = hasDom && window.pageData;

const authToken = hasDom &&
      localStorage.getItem("authToken");

export default {
  hasDom,
  apiRoot,
  pageData,
  authToken
};
