import React from "react";

import apiPath from "../../core/apiPath";
import store from "../../core/store";
import PromotionForm from "../widgets/PromotionForm";

export default class WritePromotion extends React.Component {
  render() {
    const {
      user,
      promotion
    } = this.props.appState.data;

    const {
      id
    } = promotion;

    const action = !id ?
          apiPath("promotions") :
          apiPath(`promotions/${id}`);

    const method = !id ? "post" : "put";

    return (
      <main className="manage">
        <PromotionForm action={action}
                       user={user}
                       method={method} />
      </main>
    );
  }
};
