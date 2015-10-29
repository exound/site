import R from "ramda";

export default class Validator {
  static exec(object, constraints) {
    return (new Validator(object, constraints)).errors;
  }

  constructor(object, constraints) {
    this.object = object;
    this.errors = {};

    R.forEach(this.check, constraints);
  }

  check = ({name, message, checker}) => {
    if (!(checker(this.object) || this.errors[name])) {
      this.errors[name] = message;
    }
  };
};
