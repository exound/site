import store from "../core/store";
import {findDOMNode} from "react-dom";
import Form from "../core/Form";
import {modify} from "../core/storeUpdaters";

export default function bindForm({
  name, dataPath, responsePath, storeUpdater = modify, constraints
}) {
  return function(Class) {
    const willMount = Class.prototype.componentWillMount
        , didMount = Class.prototype.componentDidMount
        , WillUnmount = Class.prototype.componentWillUnmount;

    function buildForm() {
      const actionGetter = () => this.props.action;
      const methodGetter = () => this.props.method;

      const mount = store.makeFormsMount([name]);

      mount.value = this.form = new Form(
        dataPath,
        actionGetter,
        methodGetter,
        responsePath,
        storeUpdater,
        constraints
      );
    }

    Class.prototype.componentWillMount = function() {
      willMount && willMount.bind(this)();

      buildForm.bind(this)();
    };

    Class.prototype.componentDidMount = function() {
      didMount && didMount.bind(this)();

      this.__formUpdate__  = () => {
        this.form.validate();
      };

      findDOMNode(this).addEventListener("input", this.__formUpdate__);
    };

    Class.prototype.componentWillUnmount = function() {
      WillUnmount && WillUnmount.bind(this)();

      findDOMNode(this).removeEventListener("input", this.__formUpdate__);
    };
  };
};
