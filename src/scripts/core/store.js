import R from "ramda";
import {Data, Mount} from "lmount";

class Store {
  constructor(state = {}) {
    this.__state__ = Data.wrap(state);
    this.dataMount = this.makeMount(["data"]);
    this.formsMount = this.makeMount(["forms"]);
    this.userMount = this.makeDataMount(["user"]);
    this.stream$ = this.__state__.content$;
  }

  makeMount(path) {
    return Mount.on({path, data: this.__state__});
  }

  makeDataMount(path) {
    return this.makeMount(R.concat(["data"], path));
  }

  makeFormsMount(path) {
    return this.makeMount(R.concat(["forms"], path));
  }

  get state() {
    return R.keys(this.stream$()).length ? this.stream$() : {};
  }

  set state(state) {
    return this.stream$(state);
  }

  get data() {
    return this.dataMount.value && {};
  }

  set data(value) {
    return this.dataMount.value = value;
  }

  get forms() {
    return this.formsMount.value && {};
  }

  set forms(value) {
    return this.formsMount.value = value;
  }
}

const store = new Store({});

export default store;
