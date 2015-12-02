import R from "ramda";
import Field from "../core/Field";

export default function bindField({
  isFileField,
  valueGetter,
  errorGetter,
  errorSetter,
}) {
  return function(Class) {
    const willReceiveProps = Class.prototype.componentWillReceiveProps
        , willMount = Class.prototype.componentWillMount;

    function buildField(context) {
      const {
        name,
        form
      } = context.props;

      if (form && isFileField) form.multipart = true;

      if (name && form) {
        form.addField(name, new Field(
          valueGetter, errorGetter, errorSetter, context
        ));
      }
    }

    Class.prototype.componentWillMount = function() {
      willMount && willMount.bind(this)();
      buildField(this);
    };

    return Class;
  };
};
