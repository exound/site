export default class Field {
  constructor(valueGetter, errorGetter, errorSetter, context) {
    this.valueGetter = valueGetter.bind(context);
    this.errorGetter = errorGetter.bind(context);
    this.errorSetter = errorSetter.bind(context);
  }

  get value() {
    return this.valueGetter();
  }

  get error() {
    return this.errorGetter();
  }

  set error(error) {
    return this.errorSetter(error);
  }
}
