import React from "react";

import apiPath from "../../core/apiPath";
import PromotionForm from "../widgets/PromotionForm";

export default class ManagePromotion extends React.Component {
  render() {
    const {
      promotion,
      user
    } = this.props.appState.data;

    const {
      id
    } = promotion;

    return (
      <main className="manage">
        <PromotionForm action={apiPath(`promotions/${id}`)}
                       user={user}
                       method={"put"} />
      </main>
    );
  }
};
