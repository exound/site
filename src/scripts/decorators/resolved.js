export default function resolved(Class) {
  const willMount = Class.prototype.componentWillMount;

  Class.prototype.componentWillMount = function(...args) {
    if (willMount) willMount.apply(this, ...args);

    if (!(this.data && this.data.constructor === Mount)) {
      this.data = Mount.on({
        path: this.props.path,
        data: this.props.store
      });
    }
  };
}
