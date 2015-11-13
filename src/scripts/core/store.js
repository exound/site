import R from "ramda";
import {Data, Mount} from "lmount";

import user from "./guest";

class Store {
  constructor(state = {}) {
    this.state = Data.wrap(state);
    this.dataMount = this.makeMount(["data"]);
    this.formsMount = this.makeMount(["forms"]);
    this.userMount = this.makeDataMount(["user"]);
    this.stream$ = this.state.content$;
  }

  makeMount(path) {
    return Mount.on({path, data: this.state});
  }

  makeDataMount(path) {
    return this.makeMount(R.concat(["data"], path));
  }

  makeFormsMount(path) {
    return this.makeMount(R.concat(["forms"], path));
  }

  get data() {
    return this.dataMount.value;
  }

  set data(value) {
    return this.dataMount.value = value;
  }

  get forms() {
    return this.formsMount.value;
  }

  set forms(value) {
    return this.formsMount.value = value;
  }
}

const store = new Store({});

export default store;
