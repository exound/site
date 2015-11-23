import R from "ramda";
import {PropTypes} from "react";

export default function hasHistory(Class) {
  Class.contextTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  };

  
  Object.defineProperty(Class.prototype, "history", {
    get() {
      return this.context.history;
    }
  });

  Object.defineProperty(Class.prototype, "location", {
    get() {
      return this.context.location;
    }
  });

  Class.prototype.goTo = function goTo(path) {
    return this.history.pushState(null, path);
  };
};
