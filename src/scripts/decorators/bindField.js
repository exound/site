import R from "ramda";
import Field from "../core/Field";

export default function bindField({
  valueGetter,
  errorGetter,
  errorSetter,
}) {
  return function(Class) {
    const willReceiveProps = Class.prototype.componentWillReceiveProps
        , willMount = Class.prototype.componentWillMount;

    function buildField() {
      this.field = new Field(
        valueGetter, errorGetter, errorSetter, this
      );

      const {
        name,
        form
      } = this.props;

      if (name && form) {
        form.addField(name, this.field);
      }
    }

    Class.prototype.componentWillMount = function() {
      willMount && willMount.bind(this)();
      buildField.bind(this)();
    };


    Class.prototype.componentWillReceiveProps = function(nextProps, nextContext) {
      buildField.bind(this)();
      willReceiveProps && willReceiveProps.bind(this)(nextProps, nextContext);
    };

    return Class;
  };
};
