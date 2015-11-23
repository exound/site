import {hasDom} from "../core/globals";

export default function hasTimers(Class) {
  Class.prototype.setInterval = function(func, seconds) {
    if (hasDom) this.intervals.push(setInterval(func, seconds));
  };

  Class.prototype.setTimeout = function(func, seconds) {
    if (hasDom) this.timeouts.push(setTimeout(func, seconds));
  };

  const willMount = Class.prototype.componentWillMount
      , WillUnmount = Class.prototype.componentWillUnmount;

  Class.prototype.componentWillMount = function() {
    willMount && willMount.bind(this)();

    if (hasDom) {
      this.intervals = [];
      this.timeouts = [];
    }
  };

  Class.prototype.componentWillUnmount = function() {
    WillUnmount && WillUnmount.bind(this)();

    if (hasDom) {
      this.intervals.forEach(clearInterval);
      this.timeouts.forEach(clearTimeout);
    }
  };
};
