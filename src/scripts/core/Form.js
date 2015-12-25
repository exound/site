import R from "ramda";

import jsonFeq from "./jsonFeq";
import feq from "./feq";
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
    this.action = action;
    this.method = method;
    this.storeUpdater = storeUpdater;
    this.constraints = constraints;

    if (dataPath) this.mount = store.makeDataMount(dataPath);

    if (responsePath) this.responseLens = R.lens(
      R.path(responsePath),
      R.assocPath(responsePath)
    );
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
      const data = this.multipart ?
            (() => {
              const data = new FormData();

              for (const key in this.data) {
                const item = this.data[key];

                if (item.constructor !== File &&
                    typeof item === "object") {
                  data.append(key, JSON.stringify(item));
                  continue;
                }

                data.append(key,  item);
              }

              return data;
            })():
            JSON.stringify(this.data);

      const request = () => this.multipart ? feq: jsonFeq;

      return request()[this.method()](
        this.action(), data
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

          if (mount) storeUpdater(mount, item);
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
