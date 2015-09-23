const hasDom = typeof window !== "undefined" &&
      !!window.document &&
      !!window.document.createElement;

const apiRoot = hasDom ?
      document.querySelector("meta[name=api-root]").content :
      global.apiRoot;

export default {
  hasDom,
  apiRoot 
};
