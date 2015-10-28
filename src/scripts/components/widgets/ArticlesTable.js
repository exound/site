import React from "react";
import {
  Table, TableHeader, TableHeaderColumn,
  TableBody, TableRow, Paper
} from "material-ui";

import ArticleTableRow from "./ArticleTableRow";

export default class ArticlesTable extends React.Component {
  render() {
    const articles = this.props.articles.map(article => {
      return <ArticleTableRow key={article.id} article={article} />;
    });

    const header = [
      "标题", "作者", "分类", "推送", "发布日期"
    ].map(name => <TableHeaderColumn key={name}>{name}</TableHeaderColumn>);

    return (
      <Paper zDepth={1}>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow key="header">{header}</TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {articles}
          </TableBody>
        </Table>
      </Paper>
    );
  }
};
