import R from "ramda";

import jsonFeq from "./jsonFeq";
import store from "./store";
import Validator from "./Validator";

export default class Form {
  constructor(name, dataPath, url, method, responsePath, constraints = []) {
    this.fields = {};
    this.name = name;
    this.mount = store.makeDataMount(dataPath);
    this.__url__ = url;
    this.__method__ = method;
    this.constraints = constraints;

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

  get method() {
    return typeof this.__method__ === "function" ?
      this.__method__(this.data) :
      this.__method__;
  }

  get errors() {
    return R.pickBy(
      value => {
        return !R.isNil(value);
      },
      R.map(field => field.error, this.fields)
    );
  }

  set errors(errors) {
    for (const name in errors) {
      this.fields[name].error = errors[name];
    }

    return errors;
  }

  get data() {
    return R.mapObj(field => field.value, this.fields);
  }

  validate() {
    const errors = this.errors = Validator.exec(this.data, this.constraints); 
    return !R.keys(errors).length;
  }

  submit = () => {
    if (this.validate()) {
      jsonFeq[this.method](
        this.url, JSON.stringify(this.data)
      ).then(({body, status}) => {
        if (status >= 400) {
          this.errors = body.errors;
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
};
