import R from "ramda";
import {PropTypes} from "react";

export default function hasHistory(Class) {
  Class.contextTypes = {
    history: PropTypes.object
  };

  
  Object.defineProperty(Class.prototype, "history", {
    get() {
      return this.context.history;
    }
  });
};
