import {TextField} from "material-ui";

import {bindField} from "../../decorators/form";

export default bindField({
  valueGetter() {
    return this.getValue();
  },

  errorSetter(error) {
    return this.setState({errorText: error});
  },

  errorGetter() {
    return this.state.errorText;
  }
})(TextField);
