import R from "ramda";
import validate from "validate.js";

import store from "../core/store";
import jsonFeq from "../core/jsonFeq";

class Field {
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

export function bindField({valueGetter, errorGetter, errorSetter}) {
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
}

class Form {
  constructor(name, dataPath, url, method, responsePath, validations) {
    this.fields = {};
    this.name = name;
    this.mount = store.makeDataMount(dataPath);
    this.__url__ = url;
    this.method = method;
    this.validations = validations;

    if (responsePath) {
      this.responseLens = R.lens(
        R.path(responsePath),
        R.assocPath(responsePath)
      );
    }
  }

  get url() {
    return typeof this.__url__ === "function" ?
      this.__url__(this.data) :
      this.__url__;
  }

  get errors() {
    return R.mapObj(field => field.error, this.fields);
  }

  get data() {
    return R.mapObj(field => field.value, this.fields);
  }

  setErrors(errors) {
    for (const error in errors) {
      this.fields[error].error = errors[error];
    }
  }

  validate() {
    validate(this.data, this.validations);
    return !R.keys(this.errors).length;
  }

  submit = () => {
    if (!this.validate()) {
      jsonFeq[this.method](
        this.url, JSON.stringify(this.data)
      ).then(({body, status}) => {
        if (status >= 400) {
          this.setErrors(body.errors);
        } else {
          this.mount.value = this.responseLens ?
            R.view(this.responseLens, body) :
            body;
        }
      });
    }
  };

  addField(name, field) {
    this.fields[name] = field;
  }
}

export function bindForm({name, dataPath, url, method, responsePath}) {
  return function(Class) {
    const willMount = Class.prototype.componentWillMount;

    Class.prototype.componentWillMount = function() {
      willMount && willMount();

      const mount = store.makeFormsMount([name]);

      mount.value = this.form = new Form(
        name, dataPath, url, method, responsePath
      );
    };
  };
};
