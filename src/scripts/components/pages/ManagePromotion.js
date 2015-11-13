import React from "react";

import apiPath from "../../core/apiPath";
import store from "../../core/store";
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

    const mount = store.makeDataMount(["promotion"]);

    return (
      <main className="manage">
        <PromotionForm action={apiPath(`promotions/${id}`)}
                       user={user}
                       mount={mount}
                       method={"put"} />
      </main>
    );
  }
};
