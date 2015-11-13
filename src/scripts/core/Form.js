import R from "ramda";

import jsonFeq from "./jsonFeq";
import store from "./store";
import Validator from "./Validator";

export default class Form {
  constructor(
    dataPath,
    action,
    method,
    responsePath,
    storeUpdater,
    constraints = []
  ) {
    this.fields = {};
    this.mount = store.makeDataMount(dataPath);
    this.action = action;
    this.method = method;
    this.storeUpdater = storeUpdater;
    this.constraints = constraints;

    if (responsePath) {
      this.responseLens = R.lens(
        R.path(responsePath),
        R.assocPath(responsePath)
      );
    }
  }

  get errors() {
    return R.pickBy(
      error => {
        return !R.isNil(error);
      },
      R.map(field => field.error, this.fields)
    );
  }

  set errors(errors) {
    for (const name in this.fields) {
      this.fields[name].error = errors[name];
    }

    return errors;
  }

  get data() {
    return R.pickBy(
      value => {
        return !R.isNil(value);
      },
      R.map(field => field.value, this.fields)
    );
  }

  validate() {
    const errors = this.errors = Validator.exec(this.data, this.constraints); 
    return !R.keys(errors).length;
  }

  submit = () => {
    if (this.validate()) {
      return jsonFeq[this.method()](
        this.action(), JSON.stringify(this.data)
      ).then(({body, status}) => {
        if (status >= 400) {
          this.errors = body.errors;
        } else {
          const {
            responseLens,
            storeUpdater,
            mount
          } = this;

          const item = responseLens ?
                R.view(responseLens, body) :
                body;

          storeUpdater(mount, item);
        }

        return {body, status};
      });
    }

    return Promise.reject(this.errors);
  };

  addField(name, field) {
    this.fields[name] = field;
  }
};
