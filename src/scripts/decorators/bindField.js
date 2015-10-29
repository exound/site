import Field from "../core/Field";

export default function bindField({valueGetter, errorGetter, errorSetter}) {
  return function(Class) {
    const willReceiveProps = Class.prototype.componentWillReceiveProps;

    Class.prototype.componentWillReceiveProps = function(nextProps, nextContext) {
      willReceiveProps && willReceiveProps.bind(this)(nextProps, nextContext);

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
    };

    return Class;
  };
};
