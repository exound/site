import {TextField} from "material-ui";

import bindField from "../../decorators/bindField";

export default bindField({
  valueGetter() {
    return this.getValue();
  },

  errorSetter(error) {
    this.setState({errorText: error});
    return error;
  },

  errorGetter() {
    return this.state.errorText;
  }
})(TextField);
