import React from "react";
import HomeSidebar from "../widgets/HomeSidebar";

export default class Article extends React.Component {
  render() {
    const {
      article,
      advertisements
    } = this.props.appState.data;

    const {
      title,
      header_image,
      content,
      category,
      published_at,
      user
    } = article;

    const coverUrl = header_image &&
          (header_image.match(/\?/) ?
          `${header_image}&max=1920` :
          `${header_image}?max=1920`);

    const coverStyle = {
      backgroundImage: `url('${coverUrl}')`
    };

    const cover = coverUrl &&
          <div className="cover upper" style={coverStyle} />;

    return (
      <main className="article-page">
        {cover}
        <section className="body">
          <article className="article left">
            <header>
              <div>{category}</div>

              <h1>{title}</h1>
            </header>

            <section className="misc">
            </section>

            <section className="content" dangerouslySetInnerHTML={{__html: content}} />
          </article>
        </section>
      </main>
    );
  }
};
