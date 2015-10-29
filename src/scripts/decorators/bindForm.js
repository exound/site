import store from "../core/store";
import Form from "../core/Form";

export default function bindForm({
  name, dataPath, url,
  method, responsePath, constraints
}) {
  return function(Class) {
    const willMount = Class.prototype.componentWillMount;

    Class.prototype.componentWillMount = function() {
      willMount && willMount();

      const mount = store.makeFormsMount([name]);

      mount.value = this.form = new Form(
        name, dataPath, url,
        method, responsePath, constraints
      );
    };

    return Class;
  };
};
