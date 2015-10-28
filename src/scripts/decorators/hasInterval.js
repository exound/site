import {hasDom} from "../core/globals";

export default function hasInterval(Class) {
  Class.prototype.setInterval = function(func, seconds) {
    if (hasDom) this.intervals.push(setInterval(func, seconds));
  };

  Class.prototype.componentWillMount = function() {
    this.intervals = [];
  };

  Class.prototype.componentWillUnmount = function() {
    if (hasDom) this.intervals.forEach(clearInterval);
  };
};
