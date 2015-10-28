import React from "react";
import HomeSidebar from "../widgets/HomeSidebar";
import ArticlesList from "../widgets/ArticlesList";
import LoadMore from "../widgets/LoadMore";
import {Mount} from "lmount";

export default class Profile extends React.Component {
  render() {
    const {
      nick,
      articles,
      advertisements
    } = this.props.appState.data;

    return (
      <main className="profile-page">
        <section className="body">
          <h1 className="profile-nick">{nick}</h1>
          <ArticlesList className="left" articles={articles} />
          <HomeSidebar advertisements={advertisements} />

          <LoadMore url={`/articles?column=${nick}`}
                    mount={Mount.on({path: ["articles"], data: this.store})}
                    limit={16}
                    offset={20}
                    text="更多文章" />

        </section>
      </main>
    );
  }
}
